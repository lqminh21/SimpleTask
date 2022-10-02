import React, { useEffect, useState } from "react"
import { Dropdown, Form,FormGroup, Label, Segment } from "semantic-ui-react"

function Author ({setListDisplayBooks, setBooksOfCategory, booksOfCategory, listBooks, listPublishers}) {

  const [publisher, setPublisher] = useState("All")

    const handleDropdown = (e,{value}) => {

      setPublisher(value)

        if(value === "All"){
          setBooksOfCategory(listBooks)
          setListDisplayBooks(listBooks.slice(0,5))
        }
        else{
          let data = booksOfCategory.filter((book) => (book.publisher === value))
          setBooksOfCategory(data)
          setListDisplayBooks(data.slice(0,5))
        }
    }

    return (
      <Form>
        <FormGroup>
          <Label>Publisher</Label>
        </FormGroup>
        <FormGroup>
          <Dropdown
            value = {publisher}
            pointing = "top"
            scrolling
            // text="Category"
            options={listPublishers}
            onChange={handleDropdown}
          />
        </FormGroup>
      </Form>
    )
}

export default Author