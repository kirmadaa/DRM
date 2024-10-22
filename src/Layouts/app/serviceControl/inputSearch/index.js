import {useEffect} from 'react'
import {useDispatch} from 'react-redux'

const SearchInput = ({
	placeholder,
    SEARCH_API_CALL,
    payload,
	searchTerm,
	setSearchTerm
}) => {
	const dispatch = useDispatch()

	const handleInputChange = event => {
		const query = event.target.value
		setSearchTerm(query)
	}

	useEffect(() => {
		const debounceTimer = setTimeout(() => {
			dispatch(SEARCH_API_CALL(payload))
		}, 800)

		return () => {
			clearTimeout(debounceTimer)
		}
	}, [searchTerm])

	return (
		<div className="relative w-[300px]">
			<div className="shadow rounded-lg bg-red-100 relative w-full flex justify-between items-center">
				<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
					<svg
						className="w-6 h-6"
						fill="text-gray-500"
						xmlns="http://www.w3.org/2000/svg"
						height="48"
						viewBox="0 96 960 960"
						width="48"
					>
						<path d="M782 892 528 638q-29.605 27.077-69.051 41.038Q419.503 693 381 693q-91.812 0-155.406-63.337Q162 566.325 162 474.663 162 383 225.337 319.5 288.675 256 380.11 256t155.662 63.385Q600 382.769 600 474.288 600 515 585 554.5T544 622l254 253-16 17ZM381 671q83.083 0 140.042-56.5Q578 558 578 474.5t-56.958-140Q464.083 278 381 278t-140.042 56.5Q184 391 184 474.5t56.958 140Q297.917 671 381 671Z" />
					</svg>
				</div>
				<input
					value={searchTerm}
					type="search"
					className="outlined border w-full border-gray-300 text-textSecondary text-sm rounded-lg outline-none focus:ring-0 block pl-10 p-2"
					placeholder={placeholder}
					onChange={handleInputChange}
				/>
			</div>
		</div>
	)
}

export default SearchInput
