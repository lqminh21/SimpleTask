import React, { useState } from "react"
import { Dropdown, Form,FormGroup, Label, Segment } from "semantic-ui-react"

function Author ({setListDisplayBooks, setBooksOfCategory, booksOfCategory, listBooks, listAuthors}) {

    const [author, setAuthor] = useState("All")

    const handleDropdown = (e,{value}) => {

      setAuthor(value)

        if(value === "All"){
          setBooksOfCategory(listBooks)
          setListDisplayBooks(listBooks.slice(0,5))
        }
        else{
          let data = booksOfCategory.filter((book) => (book.author === value))
          setBooksOfCategory(data)
          setListDisplayBooks(data.slice(0,5))
        }
    }

    return (
      <Form>
        <FormGroup>
          <Label>Author</Label>
        </FormGroup>
        <FormGroup>
          <Dropdown
            value = {author}
            pointing = "top"
            scrolling
            // text="Category"
            options={listAuthors}
            onChange={handleDropdown}
          />
        </FormGroup>
      </Form>
    )
}

export default Author