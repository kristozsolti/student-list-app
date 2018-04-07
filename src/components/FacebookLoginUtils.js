import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';

class FacebookLoginButton extends Component {
    responseFacebook = (response) => {
        let student = {
            id: response.id,
            name: response.name,
            email: response.email,
            pictureUrl: response.picture.data.url
          }

        this.props.callback(student);
    }

    componentClicked = () => {
        this.props.fbLoginHandler(true);
        //console.log('FB Btn clicked.')
    }

    render() {
        return (
            <div>
                <FacebookLogin
                    appId="1366238783499175"
                    autoLoad={false}
                    fields="name,email,picture"
                    onClick={this.componentClicked}
                    callback={this.responseFacebook} />
            </div>
        );
    }
}

export default FacebookLoginButton;