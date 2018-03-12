<!-- 
决定在选择图片的时候是否可以选择多张：multiple
传送给后台的数据就是：base64码
 -->
<template>
    <div id="page-login">
        <div class="imgDet clear">
            <input @change="fileChange($event)" type="file" id="upload_file" multiple style="display: none"/>
            <div class="upload_warp left">
                <div class="imgItem" v-for="(item,index) in imgList">
                    <span @click="fileDel(index)" class="delImg"></span>    
                    <img :src="item">
                </div>
                <div class="uploatBtn left" @click="fileClick" v-show="imgList.length<5">
                    <img src="../../assets/imgs/xj.png">
                    <p>上传凭证</p>
                    <p>(最多5张)</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Exif from 'exif-js' 
    export default({
        data () {
            return {
                imgList: [], // 已上传的图片列表,存储的是base64码
            }
        },
        methods: {
            // ------------------- 以下代码全部为图片上传使用 ------------------- 
            fileClick() {
                document.getElementById('upload_file').click()
            },

            // 点击上传按钮
            fileChange(el) {
                if (!el.target.files[0].size) return;
                this.fileList(el.target);
                el.target.value = ''
            },

            // 上传前的判断
            fileList(fileList) {
                let files = fileList.files;
                let lengthNum = files.length;
                if (files.length + this.imgList.length > 5) {
                    alert('最多只能上传5张')
                    lengthNum = 5 - this.imgList.length
                }
                for (let i = 0; i < lengthNum; i++) {
                    this.fileAdd(files[i]);
                }
            },

            // 图片上传
            fileAdd(file) {
                let Orientation;
                //去获取拍照时的信息，解决拍出来的照片旋转问题  
                Exif.getData(file, function(){  
                    Orientation = Exif.getTag(this, 'Orientation');  
                }); 
                let reader = new FileReader();
                reader.readAsDataURL(file); // 将图片转成 base64 格式 
                reader.onload =  () => {
                    let result = reader.result;  
                    let img = new Image();  
                    img.src = result;  
                    if (result.length <= (100 * 1024)) {  
                        this.imgList.push(result);  
                    }else {  
                        img.onload =  () => {  
                            let data = this.compress(img,Orientation);  
                            this.imgList.push(data);
                        }  
                    }  
                }
            },
            // 删除图片
            fileDel(index) {
                this.imgList.splice(index, 1);
            },
            
            // 压缩图片
            compress(img,Orientation) {  
                let canvas = document.createElement("canvas");  
                let ctx = canvas.getContext('2d');  
                // 瓦片canvas  
                let tCanvas = document.createElement("canvas");  
                let tctx = tCanvas.getContext("2d");  
                let initSize = img.src.length;  
                let width = img.width;  
                let height = img.height;  
                // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下  
                let ratio;  
                if ((ratio = width * height / 4000000) > 1) {  
                    console.log("大于400万像素")  
                    ratio = Math.sqrt(ratio);  
                    width /= ratio;  
                    height /= ratio;  
                } else {  
                    ratio = 1;  
                }  
                canvas.width = width;  
                canvas.height = height;  
                // 铺底色  
                ctx.fillStyle = "#fff";  
                ctx.fillRect(0, 0, canvas.width, canvas.height);  
                // 如果图片像素大于100万则使用瓦片绘制  
                let count;  
                if ((count = width * height / 1000000) > 1) {  
                    console.log("超过100W像素");  
                    count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片  
                    // 计算每块瓦片的宽和高  
                    let nw = ~~(width / count);  
                    let nh = ~~(height / count);  
                    tCanvas.width = nw;  
                    tCanvas.height = nh;  
                    for (let i = 0; i < count; i++) {  
                        for (let j = 0; j < count; j++) {  
                            tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);  
                            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);  
                        }  
                    }  
                } else {  
                    ctx.drawImage(img, 0, 0, width, height);  
                }  
                //修复ios上传图片的时候 被旋转的问题  
                if(Orientation != "" && Orientation != 1){
                    switch(Orientation){  
                        case 6://需要顺时针（向左）90度旋转  
                        this.rotateImg(img,'left',canvas); 
                        break;  
                    case 8://需要逆时针（向右）90度旋转  
                        this.rotateImg(img,'right',canvas);
                        break;  
                    case 3://需要180度旋转  
                        this.rotateImg(img,'right',canvas,2);//转两次（传参数来确定旋转次数）
                        //this.rotateImg(img,'right',canvas); 第二次调用会初始化canvas，所以不能这样用 
                    break;  
                }  
                }  
                //进行最小压缩  
                let ndata = canvas.toDataURL('image/jpeg', 0.5);  
                console.log('压缩前：' + initSize);  
                console.log('压缩后：' + ndata.length);  
                console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");  
                tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
                return ndata;  
            },

            // 图片旋转
            rotateImg (img, direction,canvas,roteNum) {  
                //最小与最大旋转方向，图片旋转4次后回到原方向      
                const min_step = 0;      
                const max_step = 3;        
                if (img == null)return;      
                //img的高度和宽度不能在img元素隐藏后获取，否则会出错 
                let height = img.height;      
                let width = img.width;        
                let step = 2;      
                if (step == null) {      
                    step = min_step;      
                }      
                if (direction == 'right') {      
                    step++;      
                    //旋转到原位置，即超过最大值      
                    step > max_step && (step = min_step);      
                } else {      
                    step--;      
                    step < min_step && (step = max_step);      
                }       
                //旋转角度以弧度值为参数      
                let degree = step * 90 * Math.PI / 180; 
                let ctx = canvas.getContext('2d');      
                switch (step) {      
                    case 0:  
                        canvas.width = width;      
                        canvas.height = height;      
                        ctx.drawImage(img, 0, 0);      
                        break;      
                    case 1:  
                        canvas.width = height;      
                        canvas.height = width;      
                        ctx.rotate(degree);      
                        ctx.drawImage(img, 0, -height);      
                        break;      
                    case 2:
                        canvas.width = width;      
                        canvas.height = height;     
                        ctx.rotate(degree);      
                        ctx.drawImage(img, -width, -height);      
                        break;      
                    case 3: 
                        // 需要两次旋转（传进来一个参数来确定是否连续两次旋转）
                        if (roteNum == 2) {
                            canvas.width = width;      
                            canvas.height = height;     
                            ctx.rotate(degree); 
                            ctx.rotate(degree);     
                            ctx.drawImage(img, -width, -height);  
                        } else {
                            canvas.width = height;      
                            canvas.height = width;
                            ctx.rotate(degree); 
                            ctx.drawImage(img, -width, 0);
                        }
                        break;  
                }      
            }, 
        }
    })
</script>
<style lang="scss" scoped>
    @import '../../assets/css/mixin';
    .imgDet {
        background: #fff;
        padding: .5rem;
        .uploatBtn {
            text-align: center;
            border: 1px dashed #ddd;
            p {
                @include sc(.6rem,#ccc);
            }
            @include wh(3.5em,3.5rem);
            img {
                @include wh(1rem,1rem);
                vertical-align: middle;
            }
        }

        .upload_warp {
            .imgItem {
                position: relative;
                float: left;
                margin-right: .8rem;
                margin-bottom: .5rem;
                @include wh(3.5rem,3.5rem);
                img {
                    @include wh(100%,100%);

                }
                .delImg {
                    @include wh(.8rem,.8rem);
                    position: absolute;
                    top: -0.3rem;
                    right: -0.3rem;
                    background: url(../../assets/imgs/circle.png) no-repeat;
                    background-size: .8rem;
                }
            }
        }
    }
</style>