import {
      Dimensions,
    } from 'react-native';
    import WebAPI from './WebAPI';

    class APICall {
    
      WsCallCommon(URL,method,parameter,handler) {
        console.log('URL',URL);
        console.log('method',method);
        console.log('parameter',parameter);
        console.log('handler',handler);
    
        var parameterData = null;
           console.log('call API')
        if (parameter){
         parameterData = parameter.data;
        }
        fetch((URL), {
            method: method,
            headers: {
                'apikey': (WebAPI.APIKey),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: parameterData
          }).then((response) => response.json())
          .then((responseJson) => {
              if(responseJson.status == 200)
              {
                handler({'success':responseJson,'error':null});
              }else{
                handler({'success':null,'error':responseJson.msg});
            }
    
          })
          .catch((error) => {
            handler({'success':null,'error':error});

          })

           
      }
    }
    module.exports = new APICall();