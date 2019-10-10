var objectAPICallCommon = require('./APICall');

testMethod()
{

    if(global.InternetStatus == false)
    {
      Alert.alert(global.AppMessage.appName,'Please Checked Your Internet Connections.')
      return
    }

//API Parameter
    let param = JSON.stringify({
        email: this.state.userEmail,
    })

objectAPICallCommon.WsCallCommon(WebAPI.BaseURL + WebAPI.forgotPassword,'post',{data:param},
            (data)=>{

            if(data.success)
         {
          this.setState({loadingSpinner: false,isForgetAPICalling:false});

          this.timeoutCheck = setTimeout(() => {
            Alert.alert(global.AppMessage.appName,data.msg)
            this.goBack()
            }, 500);

              }
            else
            {
              this.setState({loadingSpinner: false,isForgetAPICalling:false});

              this.timeoutCheck = setTimeout(() => {
                Alert.alert(global.AppMessage.appName,data.error)

                }, 500);
              }

            });     

    }