import React, { useState, useCallback, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Search } from 'pink-lava-ui'
import { colors } from 'src/configs/colors'
import { debounce } from 'src/utils/debounce';

interface CustomField {
    placeholder?: string;
}

function SearchQueryParams(props: CustomField) {
    const router = useRouter();
    const [searchValue, setSearch] = useState(router.query.search)
    const inputRef = useRef(null);

    const onChange = (word: string) => {
        router.push({
            ...router,
            query: { ...router.query, search: word },
        })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceSearch = useCallback(debounce(onChange, 500), [])

    const changeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        debounceSearch(e.target.value)
    }

    useEffect(() => {
        inputRef?.current?.focus();
    }, []);

    return (
        <Search
            autofocus
            ref={inputRef}
            width={'380px'}
            nameIcon="SearchOutlined"
            placeholder={props.placeholder ?? "Search Menu Design Name"}
            colorIcon={colors.grey.regular}
            onChange={changeKeyword}
            value={searchValue ?? ''}
            allowClear
        />
    )
}

export default SearchQueryParams