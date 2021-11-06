import api from "../services/api"

class ProductService{
    createProduct(product){
        let formData = new FormData();
        const selectProduct = JSON.stringify(product)
        console.log(selectProduct);
        formData.append("productRequest", new Blob([selectProduct], {type: "application/json"}));
        //formData.append("thumbnailImage", thumbnailImage, URL.createObjectURL(thumbnailImage));
        //formData.append("imageList", imageList);

        return api.post('/product', formData, {
            headers: { 
                'Content-Type': 'multipart/form-data;',
            }
        }).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error + "FAILURE");
        });
    }

}

export default new ProductService();