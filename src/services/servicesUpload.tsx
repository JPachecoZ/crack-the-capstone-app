import {BASE_URL} from '../config'

export const servicesUpload = ({file}:any) => {
  let formData = new FormData();
  formData.append('file', file);
  return fetch(`${BASE_URL}/upload`,{
    method: 'POST',
    body: formData
  })
  .then(res => res.json())
  .then(success => console.log(success.data))
  .catch(error => console.log(error))
}
