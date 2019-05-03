var onloadFunc = function() {
    var form = document.getElementById("uploadImgForm");
    var imgUploadElement = document.getElementById("imgFileuploadInput");
    var uploadImgButton = document.getElementById("uploadImgButton");
    var errorDiv = document.getElementById("errorDiv");
    errorDiv.style.display = "none";

    var imageListDiv = document.getElementById("imgListDiv");

   fetchImgList = function() {

    var bucketName = "athakur-test";
    $.ajax({
        url: "https://lv8ztgx1nk.execute-api.us-east-1.amazonaws.com/dev/" + bucketName,
        type: 'get',
        headers: {
            "content-type": "application/json"
        },
        success: function(result) {
            console.log("Success: " + JSON.stringify(result));
            if(result == null || result.body == null){
                imageListDiv.innerHTML = "No image files found for bucket " + bucketName;
            }
            else {
                var body = JSON.parse(result.body);
                if(!Array.isArray(body) || body.length == 0){
                    imageListDiv.innerHTML = "No image files found for bucket " + bucketName;
                }
                else {
                    var htmlContent = "";
                    body.forEach(item => {
                        var link = "https://s3.amazonaws.com/" + bucketName + "/" + item;
                        var htmlItemContent = "<img src='" +  link + "'/>";
                        htmlContent = htmlContent + htmlItemContent + "<br/><p>---</p><br/>";
                    });
                    imageListDiv.innerHTML = htmlContent;
                }
            }

        }
    });
}

};



