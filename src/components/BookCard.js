import '../style/style.css'
import _ from 'lodash'
import React, {useState} from 'react';
import {Modal} from 'reactstrap';

const BookCard = (props) => {

    const{volumeInfo}   = props.info;
    const description   = _.get(volumeInfo, 'description','No description')
    const authors       = _.get(volumeInfo,'authors', 'Unknown authors')
    const title         = _.get(volumeInfo,'title', 'Unknown')
    const publishedDate = _.get(volumeInfo,'publishedDate', 'Unknown date')
    const thumbnail     = _.get(volumeInfo.imageLinks,'thumbnail')
    const pageCount     = _.get(volumeInfo, 'pageCount', 'Not set')
    const language      = _.get(volumeInfo, 'language', '')
    const publisher     = _.get(volumeInfo, 'publisher', 'Missing')
    const  previewLink  = _.get(volumeInfo, 'previewLink', 'Missing')
    const infoLink      = _.get(volumeInfo, 'infoLink', 'Missing')
    let date            = new Date(publishedDate).getFullYear()
    const dat           =(date)?date:' ';
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return (

        <div className="col-md-4 d-flex justify-content-around my-2 ">
            <div style={{width:'250px'}} className=" border rounded bg-light" >
                <img src={thumbnail} alt={title} className=" mt-1 rounded ml-2"  onClick={toggle} id="img"/>
                <div className="pl-2  my-2 d-flex flex-column justify-content-start">
                    <div style={{overflow:'hidden'}}>
                        <p ><span className="infoBook">Title :</span> {title}</p>
                    </div>
                    <div  style={{overflow:'hidden'}} >
                        <p> <span className="infoBook" >Date :</span> {dat}</p>
                    </div>
                </div>
            </div>
            <Modal isOpen={modal} toggle={toggle}>
                <div className='modal-header d-flex justify-content-center border'>
                    <h5 className='text-center'>
                        {title}
                    </h5>
                    <button aria-label='Close' className='close' type='button' onClick={toggle}>
                        <span  className="text-danger"><i className="fa fa-window-close" aria-hidden="true"/>
                        </span>
                    </button>
                </div>
                <div className='modal-body'>
                    <div className='d-flex justify-content-between ml-3'>
                        <img src={thumbnail} alt={title} style={{ height: '233px' }}/>
                        <div className="pl-2">
                            <p> <span className="infoBook">Authors</span> : {authors}</p>
                            <p> <span className="infoBook">Page Count</span>: {pageCount}</p>
                            <p> <span className="infoBook">Language</span> : {language}</p>
                            <p> <span className="infoBook">Publisher </span>: {publisher}</p>
                        </div>
                    </div>
                    <div className='mt-3'>
                        <h5 className="text-center" >Description</h5>
                        {description}
                    </div>
                </div>
                <div className='modal-footer'>
                    <div className='left-silde'>
                        <a href={previewLink} className='btn-link' color='default' type='button' target='_blank' rel='noopener noreferrer'>
                            Preview Link
                        </a>
                    </div>
                    <hr/>
                    <div className='right-silde'>
                        <a href={infoLink} className='btn-link' color='default' type='button' target='_blank' rel='noopener noreferrer'>
                            Info Link
                        </a>
                    </div>
                </div>
            </Modal>
        </div>

    );
};

export default BookCard;