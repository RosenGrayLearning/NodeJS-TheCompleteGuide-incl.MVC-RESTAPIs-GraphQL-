const deleteProduct = (btn) => {
    const btnParentNode = btn.parentNode,
          prodId = btnParentNode.querySelector('[name=productId]').value,
          csrfToken = btnParentNode.querySelector('[name=_csrf]').value;

    const productElement = btn.closest('article');

    console.log(productElement)

          fetch(`/admin/product/${prodId}`,{
              method: 'DELETE',
              headers:{
                  'csrf-token' : csrfToken
              }
          }).then(result=>{
            return result.json();
          }).then(data=>{
              console.log(data)
         // for Chrome     productElement.remove();
         productElement.parentNode.removeChild(productElement);
          }).catch(err=>{
              console.log(3)
          }); 
};


