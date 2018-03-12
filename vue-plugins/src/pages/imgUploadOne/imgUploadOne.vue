<template>
    <div>
        <section class="cateStyle">
            <!--图片-->
            <div v-if="headerImage" class="imgPic">
                <img :src="headerImage" alt="">
            </div>
            <!-- 上传按钮-->
            <div class="uploadBtn">
                <input type="file" id="upload" accept="image" @change="upload" ref="imgFile">
                <label for="upload">点击上传</label>
            </div>
        </section>
        <loading v-if="showloading" :fontText="fontText"></loading>
    </div>
</template>
<script>
    import loading from '../../components/common/loading'
    import Exif from 'exif-js' 
    export default ({
        data () {
            return {
                // 图片上传对象
                headerImage:'',    // 图片的base64格式（需要传给后台的东西）
                picValue:'',       // 可以判断图片类型、大小的对象

                showloading: false,  // 显示loading
                fontText: '上传中...',// loading显示文字
                locked: true,        // 请求接口锁
            }
        },
        components: {
            loading
        },
        
        methods: {
            // 点击上传按钮
            upload (e) {
                this.showloading = true;
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length) {
                    this.showloading = false;
                    return
                };  
                this.picValue = files[0]; 
                let imgType = this.picValue.type.substr(6,this.picValue.type.length-5).toLowerCase();
                let imgSize = this.picValue.size / 1024 / 1024;
                if( imgType !== 'png' &&  imgType !== 'jpg' && imgType == 'jpeg' && imgType == 'bmp'){
                    alert('只允许上传jpg、jpeg、png、bmp格式的图片')
                    this.showloading = false;
                    this.$refs.imgFile.value = '';
                    return;
                }
                if(imgSize > 2){
                    alert('图片不能超过2M')
                    this.showloading = false;
                    this.$refs.imgFile.value = '';
                    return;
                }
                this.imgPreview(this.picValue);  
            }, 

            // 上传图片 
            imgPreview (file) {  
                let self = this;  
                let Orientation;
                //去获取拍照时的信息，解决拍出来的照片旋转问题  
                Exif.getData(file, function(){  
                    Orientation = Exif.getTag(this, 'Orientation');  
                });  

                // 看支持不支持FileReader  
                if (!file || !window.FileReader) return;  

                if (/^image/.test(file.type)) {  
                    // 创建一个reader  
                    let reader = new FileReader();  
                    // 将图片2将转成 base64 格式  
                    reader.readAsDataURL(file);  
                    // 读取成功后的回调  
                    reader.onloadend = function () { 
                        let result = this.result;  
                        let img = new Image();  
                        img.src = result;  
                        //判断图片是否大于100K,是就直接上传，反之压缩图片  
                        if (this.result.length <= (100 * 1024)) {  
                            self.headerImage = this.result;  
                            self.showloading = false; // 赋值完成后 即 图片显示了 清除loading
                        }else {  
                            img.onload = function () {  
                                let data = self.compress(img,Orientation);  
                                self.headerImage = data;
                                self.showloading = false; 
                            }  
                        }  
                    }   
                }  
            },

            // 旋转图片  
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

            // 压缩图片 
            compress(img,Orientation) {  
                let canvas = document.createElement("canvas");  
                let ctx = canvas.getContext('2d');  
                //瓦片canvas  
                let tCanvas = document.createElement("canvas");  
                let tctx = tCanvas.getContext("2d");  
                let initSize = img.src.length;  
                let width = img.width;  
                let height = img.height;  
                //如果图片大于四百万像素，计算压缩比并将大小压至400万以下  
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
                //  铺底色  
                ctx.fillStyle = "#fff";  
                ctx.fillRect(0, 0, canvas.width, canvas.height);  
                //如果图片像素大于100万则使用瓦片绘制  
                let count;  
                if ((count = width * height / 1000000) > 1) {  
                    console.log("超过100W像素");  
                    count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片  
                     //     计算每块瓦片的宽和高  
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
        }
    })
</script>
<style lang="scss" scoped>
    @import '../../assets/css/mixin';
    .uploadBtn {
        @include wh(5rem,1.5rem);
        background: $blue;
        @include sc(.7rem,#fff);
        position: relative;
        text-align: center;
        line-height: 1.5rem;
        margin: 0 auto;
        input {
            opacity: 0;
            position: absolute;
        }
    }
    .imgPic {
        margin: 1rem auto;
        @include wh(13rem,auto);
        img {
            @include wh(100%,auto);
        }
    }

</style>