<template>
    <div>
        <div class="rule-panel">
            <el-button type="primary" @click="addFormVisible = true" style="margin: 10px">添加规则</el-button>
            <el-table
                    :data="tableData"
                    style="width: 100%"
                    :row-class-name="tableRowClassName"
                    max-height="570px"
                    v-loading="loading">
                <el-table-column
                        prop="name"
                        label="名称"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="type"
                        label="类别"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="risk_level"
                        label="风险等级"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="rex"
                        label="正则表达式">
                </el-table-column>
                <el-table-column label="操作" width="200px">
                    <template slot-scope="scope" v-if="scope.row.id">
                        <el-button
                                size="mini"
                                @click="openUpdateRule(scope.row)">编辑</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="deleteConfirm(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>



<!--        添加规则dialog-->
        <el-dialog title="添加规则" :visible.sync="addFormVisible" @close="reset('addForm')" >
            <el-form :model="addForm" :rules="rules" ref="addForm">
                <el-form-item label="名称" :label-width="formLabelWidth" required prop="name">
                    <el-input v-model="addForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="类别" :label-width="formLabelWidth" required prop="type">
                    <el-input v-model="addForm.type" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="正则表达式" :label-width="formLabelWidth" required prop="rex">
                    <el-input v-model="addForm.rex" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="风险等级" :label-width="formLabelWidth" required prop="risk_level">
                    <el-radio-group v-model="addForm.risk_level">
                        <el-radio  :label="'high'">高</el-radio>
                        <el-radio  :label="'mid'">中</el-radio>
                        <el-radio :label="'low'">低</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addFormVisible = false">取 消</el-button>
                <el-button type="primary" @click.prevent="addRule('addForm')" >确 定</el-button>
            </div>
        </el-dialog>



        <!--        修改规则dialog-->
        <el-dialog title="编辑规则" :visible.sync="updateFormVisible" >
            <el-form :model="updateForm" :rules="rules" ref="updateForm" @close="reset('updateForm')">
                <el-form-item label="名称" :label-width="formLabelWidth" required prop="name">
                    <el-input v-model="updateForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="类别" :label-width="formLabelWidth" required prop="type">
                    <el-input v-model="updateForm.type" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="正则表达式" :label-width="formLabelWidth" required prop="rex">
                    <el-input v-model="updateForm.rex" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="风险等级" :label-width="formLabelWidth" required prop="risk_level">
                    <el-radio-group v-model="updateForm.risk_level">
                        <el-radio  :label="'high'">高</el-radio>
                        <el-radio  :label="'medium'">中</el-radio>
                        <el-radio :label="'low'">低</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="updateFormVisible = false">取 消</el-button>
                <el-button type="primary" @click.prevent="updateRule('updateForm')" >确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Rule",
        data() {
            return {
                tableData: [
                    {
                        id:"",
                        name: "",
                        rex: "",
                        timestamp:"",
                        type: "",
                        risk_level:""
                    }
                ],
                // dialog控制变量
                addFormVisible: false,
                updateFormVisible: false,
                // loading控制变量
                loading:true,

                // 标签长度
                formLabelWidth: '120px',

                // 表单数据
                addForm: {
                    name: '',
                    rex:'',
                    type: '',
                    risk_level:''
                },

                updateForm: {
                    id:'',
                    name: '',
                    rex:'',
                    type: '',
                    risk_level:''
                },

                deleteForm:{
                    id:""
                },

                rules: {
                    name: [
                        { required: true, message: '请输入规则名称', trigger: 'blur' }
                    ],
                    type: [
                        { required: true, message: '请输入规则类别', trigger: 'blur' }
                    ],
                    risk_level: [
                        { required: true, message: '请选择风险等级', trigger: 'change' }
                    ],
                    rex: [
                        { required: true, message: '请填写正则表达式', trigger: 'blur' }
                    ]
                },
            }
        },
        created(){
          this.getRule();
        },

        methods: {
            // 表格变色
            tableRowClassName(scope) {
                if (scope.row.risk_level=="high"){
                    return 'warning-row';
                }else if (scope.row.risk_level=="medium"){
                    return '';
                }
                return "";
            },


            // 获取规则
            getRule(){
                this.axios.get('/rule/v1/findAll')
                    .then((response) =>{
                        if(response.status == 200){
                            // 获取规则成功
                            this.tableData = response.data;
                        }
                    })
                    .catch( (error)=> {
                        // 获取规则失败
                        console.log(error);
                        this.$message.error("获取规则失败");
                    }).finally(() => this.loading = false);
            },

            // 添加规则
            addRule(form){
                this.$refs[form].validate((valid) => {
                    // 校验
                    if (valid) {
                        this.axios.post('/rule/v1/insert', this.addForm)
                            .then((response) =>{
                                if(response.status == 200){
                                    // 添加规则成功
                                    this.$message({
                                        message: '规则添加成功',
                                        type: 'success'
                                    });
                                }
                                this.addFormVisible = false;
                            })
                            .catch( (error)=> {
                                // 添加规则失败
                                console.log(error);
                                this.addFormVisible = false;
                                this.$message.error("规则添加失败");
                            }).finally(() => this.getRule());
                    } else {
                        return false;
                    }
                });
            },


            // 打开修改规则dialog
            openUpdateRule(row){
                this.updateForm.id = row.id;
                this.updateForm.name = row.name;
                this.updateForm.rex = row.rex;
                this.updateForm.type = row.type;
                this.updateForm.risk_level = row.risk_level;
                this.updateFormVisible=true;
            },



            // 修改规则
            updateRule(form){
                this.$refs[form].validate((valid) => {
                    // 校验
                    if (valid) {
                        this.axios.post('/rule/v1/update', this.updateForm)
                            .then((response) =>{
                                if(response.status == 200){
                                    // 修改规则成功
                                    this.$message({
                                        message: '规则修改成功',
                                        type: 'success'
                                    });
                                }
                                this.updateFormVisible = false;
                            })
                            .catch( (error)=> {
                                // 添加规则失败
                                console.log(error);
                                this.$message.error("修改规则失败");
                                this.updateFormVisible = false;
                            }).finally(() => this.getRule());
                    } else {
                        return false;
                    }
                });
            },

            // 重置表单
            reset(form){
                this.$refs[form].resetFields();
            },


            // 删除规则
            deleteRule(row){
                this.deleteForm.id = row.id;
                this.axios.post('/rule/v1/delete',this.deleteForm)
                    .then((response) =>{
                        if(response.status == 200){
                            // 删除成功
                            this.$message({
                                message: '规则删除成功',
                                type: 'success'
                            });
                            // this.getRule();
                        }
                    })
                    .catch( (error)=> {
                        // 删除规则失败
                        console.log(error);
                        this.$message.error("规则删除失败");
                    }).finally(() => this.getRule());
            },

            // 删除确认
            deleteConfirm(row) {
                this.$confirm('此操作将删除该规则, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRule(row);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        },

    }
</script>

<style>
    .el-table .warning-row {
        background: oldlace;
    }

    .el-table .danger-row {
        background: #f59676;
    }

    .rule-panel{
        margin-left: 20px;
        margin-right: 20px;
        background-color: white;
        height: 620px;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    }



</style>