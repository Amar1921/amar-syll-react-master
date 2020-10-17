import React, {useState} from "react"
import axios from 'axios'
import BookList from "./BookList"

require('dotenv').config();
const Search =()=>  {

    const [Livre, setLivre]=useState('');
    const [books, setBooks] = useState([]);
    const [maxResult, setMaxResult] = useState(15);
    const [errorApi, setErrorApi] = useState("")
    const API_KEY = `AIzaSyC5jXdarFSUuY_-I-8rNZWHM_3bG9gcZ48`
    const Max_Results=maxResult
    const API_URL =`https://www.googleapis.com/books/v1/volumes?q=${Livre}&maxResults=${Max_Results}&key=${API_KEY}`;
   // console.log(API_URL)
    const  book =(e)=> {
        setLivre(e.target.value)
    }


     //Function verification value input
     const verifInputAndSearchBook=()=>{

        if (Livre===''){
            document.getElementById('errorTitle').innerText='Set Book Name'
        }
        else if (!(Livre==='')){
            document.getElementById('errorTitle').innerText=''
            searchBooks()
        }

   }
    // Define Max results
     const maxResults =(result)=>{
        if(isNaN(result.target.value)) {
            setTimeout(()=>{
                document.getElementById('MaxResult').style.borderColor = 'red'
            },1000)
            setTimeout(()=>{
                document.getElementById('MaxResult').style.borderColor = 'white'
            },3000)
            document.getElementById('errorType').innerText='Not a Number !!'
        }
        if (isNaN(result.target.value)===false ){
            document.getElementById('errorType').innerText=''
        }
        if (result.target.value===''){
            document.getElementById('errorResult').innerText='Set Max Results'
        }
        if (!(result.target.value==='')){
            document.getElementById('errorResult').innerText=''
        }
        if (result.target.value > 40 || result.target.value <=0){
            document.getElementById('errorResult').innerText='Max must be between ]0 , 40]'
        }else{
            document.getElementById('errorResult').innerText='';
        }
        setMaxResult(result.target.value);

    }
    //Function Search Book
     function searchBooks(){
        axios
            .get(API_URL)
            .then((response)=> setBooks([...response.data.items]))
            .catch(err=>{
                setErrorApi(er)
               // console.log(er)
            })
   }

    /*************RESULT SEARCH O ERROR API**********/
    const render = errorApi===""?<BookList book={books}/> :<h3 className="text-center text-danger">Error Network !!</h3>
        return(
            <div className="container-fluid mt-2 mx-xs-0">
                <div id="background" >
                    <div className="row">
                        <div className="col-12 text-white d-flex justify-content-center mt-3">
                            <h1  className=" mt-1 col-xs-5 rounded"><span id="titre" className="bg-dark px-1">Book Finder <i className="fa fa-book" aria-hidden="true"> </i></span></h1>
                        </div>
                    </div>
                    <div className="row mt-3 d-flex justify-content-center ">
                        <div className="col-4 d-flex justify-content-center ">
                            <input type="text" className=" form-control m-3 text-center "
                                   value={Livre} onChange={book} />
                        </div>

                    </div>
                    <div className="row d-flex justify-content-center m-3">
                        <div className="col-4 pb-3 d-flex justify-content-center">
                            <button className="btn btn-dark px-4" onClick={verifInputAndSearchBook} type="submit"> <i className="fa fa-search pr-0 " aria-hidden="true">
                            </i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row rounded">
                    <div className="col d-flex justify-content-center">
                        <input type="number" id="MaxResult" className="text-center form-control px-0 col-1" placeholder="Max Result"  value={maxResult} onChange={maxResults}/>
                    </div>
                </div>
                <div className="row ">
                    <div className="col d-flex justify-content-center">
                        <div className="d-flex flex-column">
                            <h2 id="errorType"> </h2>
                            <h2 id="errorResult" > </h2>
                            <h2 id="errorTitle"> </h2>
                        </div>
                    </div>
                </div>
                {render}
            </div>
        )
  }
export default Search