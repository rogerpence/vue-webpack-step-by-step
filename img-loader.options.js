const options = {

    plugins: [
            require('imagemin-gifsicle')({
                interlaced: false
            }),
            require('imagemin-mozjpeg')({
                progressive: true,
                arithmetic: false
            }),
            require('imagemin-pngquant')({
                floyd: 0.5,
                speed: 2
            }),
            require('imagemin-svgo')({
                plugins: [
                    { removeTitle: true },
                    { convertPathData: false }
                ]
            })
        ]


    }

    module.exports = options;



    npm install --save-dev img-loader imagemin-gifsicle  imagemin-mozjpeg imagemin-pngquant imagemin-svgo