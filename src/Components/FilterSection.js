import React, { Component } from 'react';
import FilterButton from "./FilterButton.js";


  class FilterSection extends Component {


    handleFilter = (e) => {

    //store the user's filter option in a variable
    const selectedInput = e.target.value;

    console.log(`selected input `, selectedInput);
    //If the user has selected ebooks or audiobooks then enter into the if condition

    switch (selectedInput) {

      case "allItems": this.props.parentSetStateDisplayList(this.props.allbooks);
      break;

      case "eBooks": this.props.parentSetStateDisplayList(this.props.ebooksOnly)
      break;

      case "audioBooks": this.props.parentSetStateDisplayList(this.props.audioBooksOnly)
      break;

      default: this.props.parentSetStateDisplayList(this.props.allbooks);
      break;
    }
  }
        render() {
            console.log(this.props)
            return (
              <div className="filterMediaType">
                <h4>Filter By</h4>
                <div className="filterGroup" onChange={this.handleFilter}>
                  <FilterButton
                    type="radio"
                    id="allItems"
                    name="filterSection"
                    value="allItems"
                    labelHtmlFor="allItems"
                    labelText="All"
                    labelNumberOfItems={this.props.allbooks.length}
                  />
                  <FilterButton
                    type="radio"
                    id="eBooks"
                    name="filterSection"
                    value="eBooks"
                    labelHtmlFor="eBooksOnly"
                    labelText="eBooks"
                    labelNumberOfItems={this.props.ebooksOnly.length}
                  />
                  <FilterButton
                    type="radio"
                    id="audioBooks"
                    name="filterSection"
                    value="audioBooks"
                    labelHtmlFor="audioBooksOnly"
                    labelText="Audiobooks"
                    labelNumberOfItems={this.props.audioBooksOnly.length}
                  />
                </div>
              </div>
            );
        }
    }




export default FilterSection;