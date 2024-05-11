import React from 'react'
import axios from 'axios'

interface IItem {
	_id: number
	name: string
}

const App = () => {
	const [inputValue, setInputValue] = React.useState<string | number | readonly string[] | undefined>('')
	const [products, setProducts] = React.useState<IItem[]>([])
	const [edit, setEdit] = React.useState<Boolean>(false)
	const [editId, setEditId] = React.useState<Number>(0)
	const [isLoading, setIsLoading] = React.useState(true)

	const getData = async () => {
		try {
			const { data } = await axios.get<IItem[]>('https://api-v2.elchocrud.pro/api/v1/ba7cade2757d502017cb6dacb61e3168/products')

			setProducts(data)
		} catch (e) {
			console.error(e)
		} finally {
			setIsLoading(false)
			console.log('Finished')
		}
	}

	const postData = async () => {
		try {
			const { data } = await axios.post('https://api-v2.elchocrud.pro/api/v1/ba7cade2757d502017cb6dacb61e3168/products', {
				name: inputValue,
			})
			console.log(data)
			getData()
			setInputValue('')
		} catch (err) {
			console.log(err)
		} finally {
		}
	}
	const patchData = async () => {
		try {
			const { data } = await axios.patch('https://api-v2.elchocrud.pro/api/v1/ba7cade2757d502017cb6dacb61e3168/products/' + editId, {
				name: inputValue,
			})
			console.log(data)
			getData()
			setInputValue('')
			setEdit(false)
			setEditId(0)
		} catch (err) {
			console.log(err)
		} finally {
		}
	}

	const deleteData = async (id: number) => {
		try {
			const { data } = await axios.delete(`https://api-v2.elchocrud.pro/api/v1/ba7cade2757d502017cb6dacb61e3168/products/${id}`)
			console.log(data)
			getData()
		} catch (err) {
			console.log(err)
		} finally {
		}
	}

	React.useEffect(() => {
		getData()
	}, [])

	return (
		<>
			<h1>Todo</h1>
			<div className="app">
				<div className="app__input">
					<button onClick={() => (edit ? patchData() : postData())}>{edit ? 'Edit' : 'Send'} </button>
					<input type="text" onChange={(e) => setInputValue(e.target.value)} value={inputValue} />
				</div>
				<div className="app__items">
					{isLoading ? (
						<>Loading...</>
					) : (
						products.map((items) => (
							<div key={items._id}>
								<p>{items.name}</p>
								<button
									onClick={() => {
										setEdit(true)
										setInputValue(items.name)
										setEditId(items._id)
									}}>
									Edit
								</button>
								<button onClick={() => deleteData(items._id)}>Delete</button>
							</div>
						))
					)}
				</div>
			</div>
		</>
	)
}

export default App
