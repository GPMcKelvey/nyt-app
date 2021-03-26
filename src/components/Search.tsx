import React, { Component } from 'react';
import SearchDisplay from './SearchDisplay';
import {Button} from 'reactstrap';

type AcceptedProps = {
}

type SearchState = {
    searchTerm: string,
    startDate?: string,
    endDate?: string,
    pageNumber: number,
    results: []
}

export default class Search extends Component<AcceptedProps, SearchState> {
    constructor(props: AcceptedProps) {
        super(props)
        this.state = {
            searchTerm: '',
            startDate: '',
            endDate: '',
            pageNumber: 0,
            results: []
        }
    }

    prev = async (e: any) => {
         if(this.state.pageNumber > 0)  {
      await this.setState({
            pageNumber: (this.state.pageNumber -1)
        })
        this.searchFetch(e)
        console.log(this.state.pageNumber)
    } else{
        return
    }
}

    next = async (e: any) => {
        await this.setState({
            pageNumber: (this.state.pageNumber +1)
        })
        this.searchFetch(e)
        console.log(this.state.pageNumber)
    }


    searchFetch = (event: any) => {
        const baseURL: string = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        const key: string = "x8PXDV7Ne4BoGZoMZQ6DR57zWTjk7ugl";
        fetch(`${baseURL}?api-key=${key}&page=${this.state.pageNumber}&q=${this.state.searchTerm}`)
        .then(res => res.json())
        .then((json) => (
            //console.log(json),
            this.setResults(json)
        ))
        event.preventDefault();
    }

    setResults = (e: any) => {
        this.setState({
            results: e.response.docs
        })
        console.log(this.state.results)
    }
    searchFunction (event: any) {
            const input = event.target.value;
            this.setState({
            searchTerm: input
            });
        }



    render() {
        return (
            <div>
                <form onSubmit={this.searchFetch}>
                    <input placeholder='search' onChange={(event) => this.searchFunction(event)}/>
                    <label>Start Date: </label>
                    <input type='date' name="startDate" id='startDate' />
                    <label>End Date: </label>
                    <input type='date' name='endDate' id='endDate'/>
                    <Button type="submit">Search</Button>
                </form>
                <h4>Page: {this.state.pageNumber}</h4>
                <Button onClick={this.prev}>previous 10</Button>
                <Button onClick={this.next}>next 10</Button>
                <SearchDisplay result={this.state.results} />
            </div>
        )
    }
}




// const SearchDisplay = (props: any) => {

//        let items = props.result.response;
//     return (
//         <div>
//             {
//                 items.map((article: any) =>
//                     <li>{article}</li>
//                     )
//             }
//         </div>
//     )
    
// }

// export default Search;






// componentWillUpdate() {
//     const baseURL: string = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
//     const key: string = "x8PXDV7Ne4BoGZoMZQ6DR57zWTjk7ugl";
//     fetch(`${baseURL}?api-key=${key}&page=${this.state.pageNumber}&q=${this.state.searchTerm}`)
//     .then(res => res.json())
//     .then((json) => JSON.stringify(json))
//     .then((jsonStr) => 
//     this.setState({results: jsonStr}))
//     // (
//     //     console.log(json)
//     //     this.setResults(json);
//     // ))
//     // event.preventDefault();
//     console.log(this.state.results);
// }