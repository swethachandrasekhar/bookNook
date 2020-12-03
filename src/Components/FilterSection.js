import React, { Component } from 'react';
import FilterButton from "./FilterButton.js";


  class FilterSection extends Component {
    handleFilter = (e) => {
      //store the user's filter option in a variable
      const selectedInput = e.target.value;

      // console.log(`selected input `, selectedInput);
      //If the user has selected ebooks or audiobooks then enter into the if condition

      switch (selectedInput) {
        case "allItems":
          this.props.parentSetStateMainDisplay(this.props.allbooks);
          break;

        case "eBooks":
          this.props.parentSetStateMainDisplay(this.props.ebooksOnly);
          break;

        case "audioBooks":
          this.props.parentSetStateMainDisplay(this.props.audioBooksOnly);
          break;

        default:
          this.props.parentSetStateMainDisplay(this.props.allbooks);
          break;
      }
    };

    handleFilterCategory = (e) => {
      const selectedInput = e.target.value;
      console.log(selectedInput);
      let mainDisplayBooks = [...this.props.mainDisplay];
      const filteredCatergory = mainDisplayBooks.filter((book) => {
        // console.log(book.category, e);
        if (book.category === selectedInput) {
          return book;
        }
      });
      console.log(filteredCatergory);
      this.props.parentSetStateDisplayList(filteredCatergory);
      // based on the value, filter the display
    }

    render() {
      console.log(this.props);
      return (
        <div className="filterMediaType">
          <h4>Media Type</h4>
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
          <h4>Categories</h4>
          <div className="filterCategory" onChange={this.handleFilterCategory}>
            <FilterButton
              type="radio"
              id="fiction"
              name="filterCategory"
              value="fiction"
              labelHtmlFor="fiction"
              labelText="fiction"
              labelNumberOfItems=""
            />
            <FilterButton
              type="radio"
              id="nonfiction"
              name="filterCategory"
              value="nonfiction"
              labelHtmlFor="nonfiction"
              labelText="nonfiction"
              labelNumberOfItems=""
            />
          </div>
          
        </div>
      );
    }
  }




export default FilterSection;