
import React, { useEffect, useState } from "react"
import { Dropdown, Form,FormGroup, Label, Segment } from "semantic-ui-react"

function Category ({setListDisplayBooks, setBooksOfCategory, booksOfCategory, listBooks, listCategories}) {

    const [category, setCategory] = useState("All")

    const handleDropdown = (e,{value}) => {

      setCategory(value)
      
      if(value === "All"){
        setBooksOfCategory(listBooks)
        setListDisplayBooks(listBooks.slice(0,5))
      }
      else{
        let data = booksOfCategory.filter((book) => (book.category === value))
        setBooksOfCategory(data)
        setListDisplayBooks(data.slice(0,5))
      }
    }

    return (
      <>
     <Form>
        <FormGroup>
          <Label>Category</Label>
        </FormGroup>
        <FormGroup>
        <Dropdown
          value = {category}
          pointing = "top"
          scrolling
          // text="Category"
          options={listCategories}
          onChange={handleDropdown}
        />
        </FormGroup>
      </Form>
      </>
    )
}

export default Category