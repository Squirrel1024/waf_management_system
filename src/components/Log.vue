<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="18" :offset="4">
                <div class="log-panel">
                    <el-table
                            :data="logs"
                            style="width: 100%"
                            :default-sort = "{prop: 'date', order: 'descending'}"
                            stripe
                            max-height="480px"
                            v-loading="loading"
                    >
                        <el-table-column
                                prop="timestamp"
                                label="日期"
                                sortable
                                width="250">
                        </el-table-column>
                        <el-table-column
                                prop="path"
                                label="路径"
                                sortable
                        >
                        </el-table-column>
                        <el-table-column label="操作"
                                         width="150">
                            <template slot-scope="scope" v-if="scope.row.id">
                                <el-button
                                        size="mini"
                                        type="primary"
                                        @click="openLogDialog(scope.row)">查看</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
        </el-row>

        <!--    日志查看dialog-->
        <el-dialog title="日志查看" :visible.sync="dialogVisible">
            <div style="white-space: pre-line; font-family:'Helvetica';font-size: 14px">{{log.contents}}</div>
        </el-dialog>
    </div>

</template>

<script>
    export default {
        data () {
            return {
                logs: [
                    {
                        id: '',
                        path: "",
                        timestamp: "",
                        contents: [
                        ],
                        length: ''
                    },
                ],
                // dialog控制变量
                dialogVisible: false,
                // loading控制变量
                loading:true,
                log: {
                    id: '',
                    path: "",
                    timestamp: "",
                    contents: [],
                    length: ''
                },
            }
        },
        methods: {
            getAllLogs() {
                this.axios.get('/log/v1/selectAll')
                    .then((response) => {
                        if (response.status == 200) {
                            // 获取成功
                            this.logs = response.data;
                        }
                    })
                    .catch((error) => {
                        // 获取失败
                        console.log(error)
                        this.$message.error("日志获取失败");
                    })
                    .finally(() => this.loading = false);
            },
            openLogDialog(row){
                this.dialogVisible =true;
                this.log = row;
            },
        },
        created(){
            this.getAllLogs();
        }

    }
</script>

<style>
    .log-panel{
        background-color: white;
        height: 480px;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        margin-top: 30px;
    }
</style>
