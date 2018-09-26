import React, { Component } from 'react';
import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    EmailShareButton,
    FacebookIcon,
    WhatsappIcon,EmailIcon,TelegramIcon,TwitterIcon
  } from 'react-share';
  import './Custom.css';
  class SocialShare extends Component {
      constructor(props){
          super(props);
          this.state={
              link:''
          }
        
          
      }
    render() {
      return (
        <div>
    <div className="Demo__some-network">  
        <FacebookShareButton
                url="http://github.com/"
                quote="hahah"
                className="Demo__some-network__share-button" >
        <FacebookIcon
        size={50}
        round />
    </FacebookShareButton>
    </div>

    <div className="Demo__some-network"> 
    <WhatsappShareButton
            url="http://github.com/"
            title="NewSite"
            separator=":: "
            className="Demo__some-network__share-button">
            <WhatsappIcon size={50} round />
        </WhatsappShareButton>
    </div>

    <div className="Demo__some-network">
        <TwitterShareButton
            url="http://localhost:3000/"
            title="NewSite"
            className="Demo__some-network__share-button"   >
            <TwitterIcon
            size={50}
            round />
        </TwitterShareButton>
        </div>
    </div>
      );
    }
  }
  
  export default SocialShare;
  