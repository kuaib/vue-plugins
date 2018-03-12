<template>
    <div class="upload">
        <!-- 拖拽区域 -->
        <div class="dragArea" @drop="drop($event)" @dragenter="dragenter($event)" @dragover="dragover($event)">将文件拖到此处</div>

        <!-- 文件数量显示 -->
        <div class="fileText">选中{{imgList.length}}张文件，共{{bytesToSize(this.size)}}</div>

        <!-- 图片显示 -->
        <div class="uploadWrap" v-show="imgList.length!=0">
            <div class="imgItem" v-for="(item,index) of imgList">
                <div class="item-top">
                    <div class="imgText">{{item.file.name}}</div>
                    <img src="../../assets/imgs/circle.png" class="delBtn" @click="fileDel(index)">
                </div>
                <img :src="item.file.src" class="img">
            </div>
      </div>
    </div>
</template>
<script>
    export default({
        data () {
          return {
            imgList: [],
            size: 0
          }
        },
        methods: {
            fileList(fileList) {
                let files = fileList.files;
                for (let i = 0; i < files.length; i++) {
                //判断是否为文件夹
                if (files[i].type != '') {
                    this.fileAdd(files[i]);
                } else {
                    //文件夹处理
                    this.folders(fileList.items[i]);
                    }
                }
            },
            //文件夹处理
            folders(files) {
                let _this = this;
                //判断是否为原生file
                if (files.kind) {
                    files = files.webkitGetAsEntry();
                }
                files.createReader().readEntries(function (file) {
                    for (let i = 0; i < file.length; i++) {
                        if (file[i].isFile) {
                            _this.foldersAdd(file[i]);
                        } else {
                            _this.folders(file[i]);
                        }
                    }
                })
            },

            foldersAdd(entry) {
                let _this = this;
                entry.file(function (file) {
                    _this.fileAdd(file)
                })
            },
            fileAdd(file) {
                //总大小
                this.size = this.size + file.size;
                //判断是否为图片文件
                if (file.type.indexOf('image') == -1) {
                    file.src = 'wenjian.png';
                    this.imgList.push({file});
                } else {
                let reader = new FileReader();
                    reader.vue = this;
                    reader.readAsDataURL(file);
                    reader.onload = function () {
                        file.src = this.result;
                        this.vue.imgList.push({file});
                    }
                }
            },

            // 删除图片
            fileDel(index) {
                this.size = this.size - this.imgList[index].file.size;//总大小
                this.imgList.splice(index, 1);
            },

            // 计算图片大小
            bytesToSize(bytes) {
                if (bytes === 0) return '0 B';
                let k = 1000, // or 1024
                sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
                i = Math.floor(Math.log(bytes) / Math.log(k));
                return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
            },
            dragenter(el) {
                el.stopPropagation();
                el.preventDefault();
            },
            dragover(el) {
                el.stopPropagation();
                el.preventDefault();
            },
            drop(el) {
                el.stopPropagation();
                el.preventDefault();
                this.fileList(el.dataTransfer);
            }
        }
    })
</script>
<style lang="scss" scoped>
    .upload {
        width: 600px;
        border: 1px solid #999;
        margin: 10px auto;
        
        // 拖拽区域
        .dragArea {
            border: 1px dashed #999;
            width: 500px;
            height: 150px;
            line-height: 150px;
            color: #999;
            font-size: 20px;
            text-align: center;
            margin: 15 auto;
        }
    
        // 文件数量显示
        .fileText {
            text-align: left;
            margin-bottom: 10px;
            padding-top: 10px;
            text-indent: 14px;
            border-top: 1px solid #ccc;
            font-size: 14px;
        }

        // 图片显示
        .uploadWrap {
            border-top: 1px solid #D2D2D2;
            padding: 14px 0 0 14px;
            overflow: hidden;
            .imgItem {
                position: relative;
                height: 100px;
                width: 120px;
                border: 1px solid #ccc;
                margin: 0px 30px 10px 0px;
                float: left;
                line-height: 100px;
                display: table-cell;
                text-align: center;
                background-color: #eee;
                cursor: pointer;
                .item-top {
                    position: absolute;
                    top: 0;
                    width: 100%;
                    height: 30px;
                    background-color: rgba(0, 0, 0, 0.4);
                    line-height: 30px;
                    text-align: left;
                    color: #fff;
                    font-size: 12px;
                    text-indent: 4px;
                    .imgText {
                        white-space: nowrap;
                        width: 80%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .delBtn {
                        position: absolute;
                        top: 6px;
                        width: 16px;
                        right: 4px;
                    }
                }
                .img {
                    max-width: 100%;
                    max-height: 100%;
                    vertical-align: middle;
                }
            }
        }
    }
    
    

    




    

    

    


    

    

    


    /*.upload_warp_left img {
      margin-top: 32px;
    }

    .upload_warp_left {
      float: left;
      width: 40%;
      height: 100%;
      border: 1px dashed #999;
      border-radius: 4px;
      cursor: pointer;
    }*/

    .upload_warp {
      margin: 14px;
      height: 130px;
    }

    /*.upload {
      border: 1px solid #ccc;
      background-color: #fff;
      width: 650px;
      box-shadow: 0px 1px 0px #ccc;
      border-radius: 4px;
    }*/

    .hello {
      width: 650px;
      margin-left: 34%;
      text-align: center;
    }
  </style>
