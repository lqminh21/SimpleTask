import { memo, useEffect, useState } from "react"

import { Form, FormGroup, Label, Dropdown} from "semantic-ui-react"

function FilterMultipleData ({setListDisplayBooks, setBooksOfCategory, listBooks, listAuthors, listCategories, listPublishers}){

    const [author, setAuthor] = useState("All")
    const [publisher, setPublisher] = useState("All")
    const [category, setCategory] = useState("All")

    const handleOnChangeAuthor = (e,{value}) => {
        setAuthor(value)
    }

    const handleOnChangeCategory = (e,{value}) => {
        setCategory(value)
    }
    
    const handleOnChangePublisher = (e, {value}) => {
        setPublisher(value)
    }

    useEffect(() => {
        let data = []
        switch (true){
            case author === "All" && category === "All" && publisher === "All":
                data = listBooks
                break
            case author === "All" && category === "All":
                data = listBooks.filter( book => (book.publisher === publisher))
                break
            case author === "All" && publisher === "All":
                data = listBooks.filter( book => (book.category === category))
                break
            case category === "All" && publisher === "All":
                data = listBooks.filter( book => (book.author === author))
                break
            case author === "All":
                data = listBooks.filter( book => (book.category === category && book.publisher === publisher) )
                break
            case category === "All":
                data = listBooks.filter( book => (book.author === author && book.publisher === publisher) )
                break
            case publisher === "All":
                data = listBooks.filter( book => (book.author === author && book.category === category) )
                break
            default:
                data = listBooks.filter(book => (book.author === author && book.category === category && book.publisher === publisher))
        }
        setBooksOfCategory(data)
        setListDisplayBooks(data.slice(0,5))
    },[author, publisher, category])

    // console.log("filterMultipleData: rerender")
    return (
        <Form>
            <FormGroup>
                    <Label size="large">
                        Author : {" "}
                        <Dropdown
                        value = {author}
                        pointing = "top"
                        scrolling
                        options={listAuthors}
                        onChange={handleOnChangeAuthor}
                        />
                    </Label>
            </FormGroup>

            <FormGroup>
                    <Label size="large">
                        Category : {" "}
                        <Dropdown
                        value = {category}
                        pointing = "top"
                        scrolling
                        options={listCategories}
                        onChange={handleOnChangeCategory}
                        />
                    </Label>
            </FormGroup>

            <FormGroup>
                <Label size="large">
                    Publisher : {" "}
                    <Dropdown
                        value = {publisher}
                        pointing = "top"
                        scrolling
                        options={listPublishers}
                        onChange={handleOnChangePublisher}
                    />
                </Label>
            </FormGroup>
        </Form>
    )
}

export default memo(FilterMultipleData)