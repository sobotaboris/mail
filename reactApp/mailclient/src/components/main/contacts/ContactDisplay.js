import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import EmailList from '../emails/EmailListPaper'
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Divider from '@material-ui/core/Divider';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import ComposeFC from './ComposeForContact';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

export class ContactDisplay extends Component {

    constructor(props){
        super(props);

        this.state = {
            username: '',
            folders: [],
            messages: []
        }
    }

    deleteContact = () =>{
        this.props.deleteContact(this.props.contact.id, this.props.contact.position);
        this.forceUpdate();
    }

    render() {
        return (
            <div>
                <div style = {this.display}>
                

                    <ul style={{margin: '0px'}}>
                        <li style={this.liItem} >
                            <div style={this.liWrapper}>
                                <p style={this.liHeader}>First Name</p>
                                <p style={this.liData}>{this.props.contact.firstname}</p>

                            </div>
                        </li>
                        <li style={this.liItem} >
                            <div style={this.liWrapper}>
                                <p style={this.liHeader}>Last Name</p>
                                <p style={this.liData}>{this.props.contact.lastname}</p>
                            </div>
                        </li>
                        <li style={this.liItem} >
                            <div style={this.liWrapper}>
                                <p style={this.liHeader}>Display Name</p>
                                <p style={this.liData}>{this.props.contact.displayname}</p>
                            </div>
                        </li>
                        <li style={this.liItem} >
                            <div style={this.liWrapper}>
                                <p style={this.liHeader}>Email</p>
                                <p style={this.liData}>{this.props.contact.email}</p>
                            </div>
                        </li>
                        <li style={this.liItem} >
                            <div style={this.liWrapper}>
                            <IconButton onClick={this.deleteContact}>
                                <DeleteIcon fontSize="large" style={{color:'#FFFFFF'}}/>
                            </IconButton>
                            </div>
                        </li>
                    </ul>  
                    
                    
                    </div>
                <div style={this.contactAttachment}>
                <ul style={{margin: '0px'}}>
                        <li style={this.liItem} >
                            <ComposeFC email={this.props.contact.email}></ComposeFC>
                        </li>
                        
                        <li style={this.liItem} >
                            <div style={this.liWrapperAttachment}>
                                
                                <PopupState variant="popover" popupId="demo-popup-popover">
                    {popupState => (
                        <div style={{display: 'inline-block'}}>
                        
                        <p style={this.liHeader} {...bindTrigger(popupState)}>Note</p>
                        <Popover
                        PaperProps = {{
                            style: {
                                borderRadius: '20px',
                                padding: '30px',
                                background: 'linear-gradient(90deg, rgba(254,132,15,1) 0%, rgba(251,71,112,1) 100%)'
                              },
                        }}
                            {...bindPopover(popupState)}
                            anchorOrigin={{
                                vertical: 'bottom',
                                 horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            <p style={{color: 'white', margin: '0', fontWeight: '600'}}>{this.props.contact.note}</p>
                            
                            
                        </Popover>
                        </div>
                    )}
                    </PopupState>
                            </div>
                        </li>
                    </ul>  
                </div>
                
                <div style={this.contactPhotoWrapper}>
                <img style={{borderRadius: '50%'}} width='150' height= '150' src={this.props.contact.photo} alt="No photo" />
                </div>
                        
                
                <div style = {this.displayMessages}>
                    <div style={this.list}>
                        <div style={this.messageHeader}>
                            <p style={this.messageTitle}>Messages</p>
                        </div>
                        <EmailList menuAvailable={false} messages={this.props.messages}></EmailList>
                    </div>
                </div>
            </div>
            

        )
    }

    contactPhotoWrapper = {
        position: 'fixed',
        display: 'inline-block',
        width: '150px',
        height: '150px',
        marginTop: '15px',
        right: '0',
        marginRight: '25%',
        zIndex: '10',
        borderRadius: '50%',
        background: 'rgba(254,132,15,1)',
        boxShadow: '0px 0px 15px 0px rgba(0,0,0,0.5)'

    }

    contactAttachment = {
        position: 'fixed',
        display: 'inline-block',
        width: '20%',
        height: '11%',
        marginTop: '250px',
        marginRight: '20%',
        borderRadius: '20px',
        right: '0',
        background: 'rgba(251,71,112,1)',
        boxShadow: '0px 0px 15px 0px rgba(251,71,112,1)'
    }

    liWrapperAttachment = {
        display: 'inline-block', 
        width: '48%',
        marginTop: '5vh'

    }

    liWrapperAttachmentMail = {
        display: 'inline-block', 
        width: '48%',
        marginTop: '5vh',
        borderRight: '3px solid white'

    }

    liWrapper = {
        display: 'inline-block', 
        width: '20%'

    }

    liHeader = {
        display: 'inline-block', 
        width: '100%',
        color: '#FFF',
        fontWeight: '600',
        fontSize: '22px',
        margin: '0px',
        marginTop: '15px'
    }

    liData = {
        display: 'inline-block', 
        width: '100%',
        color: '#FFF',
        fontWeight: '500',
        fontSize: '17px',
        margin: '0px',
        marginTop: '15px'
    }
  
    
    liItem = {
        display: 'inline'
    }

    profileDataTitle = {
        fontSize: '22px',
        textAlign: 'left',
        width: '100%',
        color: '#FFF',
        margin: '0',
        fontFamily: 'Roboto ',
        letterSpacing: '2px'
    }

    


    messageTitle = {
        margin: '0',
        
    }

    messageHeader = {
        width: '100%',
        height: '15%',
        background: 'linear-gradient(90deg, rgba(254,132,15,1) 0%, rgba(251,71,112,1) 100%)',
        fontWeight: '500',
        color: '#FFF',
        fontSize: '21px',
        
    }

    avatar = {
        
        background: '#6f32ff',
        height: '100px',
        width: '100px',
        display: 'inline-block'
    }

    contact = {
        height: '100%',
        width: '100%',
        margin : '0'
    }

    note = {
        bottom: '0',
        width: '100%',
        height: '30%',
        borderRadius: '0px 0px 10px 10px'
    }

    display = {
        zIndex: '10',
        position: 'fixed',
        display: 'inline-block',
        width: '50%',
        height: '11%',
        padding: '20px',
        marginTop: '155px',
        marginRight: '100px',
        borderRadius: '20px',
        right: '0',
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.5)',
        background: 'linear-gradient(90deg, rgba(254,132,15,1) 0%, rgba(251,71,112,1) 100%)'
    }

    displayMessages = {
        overflow: 'auto',
        position: 'fixed',
        display: 'inline-block',
        width: '50%',
        height: '40%',
        margin: '50px',
        marginRight: '100px',
        borderRadius: '10px',
        right: '0',
        bottom: '0',
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.5)'
    }

    list = {
        overflow: 'hidden',
        width: '100%',
        
    }
}

export default ContactDisplay
