import React from 'react'
import styled from 'styled-components'

const StyledSelect = styled.select`
	color: ${({ theme }) => theme.text};
	background: transparent;
	border: none;
	border-bottom: 1px solid grey;
	margin: 0 2px;
	font-size: 1.5em;
	max-width: 100%;
`

const Dropdown = props => {
	return (
		<StyledSelect onChange={props.onChange}>
			<option></option>
			{ props.options && props.options.map((o, i) => (
				<option key={i} value={o.id}>
					{o.name}
				</option>
			))}
		</StyledSelect>
	)
}

export default Dropdown