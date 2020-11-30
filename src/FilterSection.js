import React, { Component } from 'react';


    class FilterSection extends Component {


         handleFilter = (e) => {
    //store the user's filter option in a variable
    const selectedInput = e.target.value;
    console.log(`selected input `, selectedInput);
    //If the user has selected ebooks or audiobooks then enter into the if condition
    switch (selectedInput) {
      case "allItems":
          this.props.parentSetStateDisplayList(this.props.allbooks);
        // this.setState({
        //   displayList: this.state.books,
        // });
        break;
      case "eBooks":
           this.props.parentSetStateDisplayList(this.props.ebooksOnly)
        // this.setState({
        //   displayList: this.state.ebooksList,
        // });
        break;

      case "audioBooks":
          this.props.parentSetStateDisplayList(this.props.audioBooksOnly)
        // this.setState({
        //   displayList: this.state.audioBookslist,
        // });
        break;
    }
  }
        render() {
            console.log(this.props)
            return (
              <div className="filterMediaType">
                <p>Media type</p>
                <div className="filterGroup" onChange={this.handleFilter}>
                  <div>
                    <input
                      type="radio"
                      id="allItems"
                      name="filterSelection"
                      value="allItems"
                    />allbooks
                    <label htmlFor="allItems">All{(this.props.allbooks).length}</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="eBooks"
                      name="filterSelection"
                      value="eBooks"
                    />
                    <label htmlFor="eBooksOnly">eBooks{(this.props.ebooksOnly).length}</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="audioBooks"
                      name="filterSelection"
                      value="audioBooks"
                    />
                    <label htmlFor="audioBooksOnly">
                      Audiobooks{(this.props.audioBooksOnly).length}
                    </label>
                  </div>
                </div>
              </div>
            );
        }
    }




export default FilterSection;