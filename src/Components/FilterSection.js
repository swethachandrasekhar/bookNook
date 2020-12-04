//FILTER SECTION  class component

import { Component } from "react";
import FilterButton from "./FilterButton.js";

class FilterSection extends Component {
  //function to handle filter input for book media types
  handleFilter = (e) => {
    //store the user's filter option in a variable
    const selectedInput = e.target.value;

    //  enter into the switch conditions to set parent state according through functions
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

  //function to handle the select on category
  handleFilterCategory = (e) => {
    //store the user's filter selection
    const selectedInput = e.target.value;
    let mainDisplayBooks = [...this.props.mainDisplay];
    // filter the main display list by the category type based on the user's input
    const filteredCatergory = mainDisplayBooks.filter((book) => {
      if (book.category === selectedInput) {
        return book;
      }
    });

    //Set the display list using this function that sets parents state
    this.props.parentSetStateDisplayList(filteredCatergory);
  };

  render() {
    return (
      <div className="filterMediaType">
        <h4>Media Type</h4>
        <div className="filterGroup" onChange={this.handleFilter}>
          {/* filter buttons component for media types input */}
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
            id="allItems"
            name="filterSection"
            value="allItems"
            labelHtmlFor="allItems"
            labelText="Books"
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
          {/* filter button component for category input (fiction and non fiction) : note - not passing the count; Filter button component to handle the empty string*/}
          <FilterButton
            type="radio"
            id="fiction"
            name="filterCategory"
            value="fiction"
            labelHtmlFor="fiction"
            labelText="Fiction"
            labelNumberOfItems=""
          />
          <FilterButton
            type="radio"
            id="nonfiction"
            name="filterCategory"
            value="nonfiction"
            labelHtmlFor="nonfiction"
            labelText="Nonfiction"
            labelNumberOfItems=""
          />
        </div>
      </div>
    );
  }
}

export default FilterSection;
