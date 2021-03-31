import React, { ChangeEvent, Component, FormEvent } from 'react';
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

    prev = async (e: object) => {
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

    next = async (e: object) => {
        await this.setState({
            pageNumber: (this.state.pageNumber +1)
        })
        this.searchFetch(e)
        console.log(this.state.pageNumber)
    }


    searchFetch = (event: any) => {
        const baseURL: string = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        const key: string = "x8PXDV7Ne4BoGZoMZQ6DR57zWTjk7ugl";
        let url: string = `${baseURL}?api-key=${key}&page=${this.state.pageNumber}&q=${this.state.searchTerm}`
        
        if(this.state.startDate && this.state.endDate !== ''){
            url += '&begin_date=' + this.state.startDate + '&end_date=' + this.state.endDate
        };

        if(this.state.startDate !== '') {
          url += '&begin_date=' + this.state.startDate;
        };
        
        if(this.state.endDate !== '') {
          url += '&end_date=' + this.state.endDate;
        };


        fetch(url)
        .then(res => res.json())
        .then((json) => (
            //console.log(json),
            this.setResults(json)
        ))
        event.preventDefault();
        console.log(this.state.startDate, this.state.endDate)
    }

    setResults = (e: any) => {
        this.setState({
            results: e.response.docs
        })
        console.log(this.state.results)
    }
    // searchFunction (event: any) {
    //         const input = event.target.value;
    //         this.setState({
    //         searchTerm: input,
    //         pageNumber: 0,
    //         startDate: '',
    //         endDate: ''
    //         });
    //     }
    // startDateFunc (event: any) {
    //     const input1 = event.target.value;
    //     this.setState({
    //         startDate: input1
    //     })
    // }
    // endDateFunc (event: any) {
    //     const input2 = event.target.value;
    //     this.setState({
    //         endDate: input2
    //     })
    // }

    inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        this.setState({
                ...this.state,
                [e.target.name]: value,
            })
    }


    render() {
        return (
            <div>
                <form onSubmit={this.searchFetch}>
                    <input placeholder='search' name='searchTerm' id='search' value={this.state.searchTerm} onChange={this.inputHandler}/>
                    <label>Start Date: </label>
                    <input type='date' name="startDate" id='start' pattern="[0-9]{8}" value={this.state.startDate} onChange={this.inputHandler} />
                    <label>End Date: </label>
                    <input type='date' name='endDate' id='end' pattern="[0-9]{8}" value={this.state.endDate} onChange={this.inputHandler} />
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


//this.setState({
//     ...this.state,
//     [e.target.name] : value
// })

//value={this.state.endDate} onChange={this.inputHandler}