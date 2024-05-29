import { Avatar, Select, Spin } from 'antd'
import debounce from 'lodash.debounce'
import { useEffect, useMemo, useRef, useState } from 'react'
export interface UserValue {
  value: string
  label: string
  photoURL: string
}
export function DebounceSelect({ fetchOptions, debounceTimeout = 300, curMembers, ...props }: any) {
  // Search: abcddassdfasdf

  const [fetching, setFetching] = useState(false)
  const [options, setOptions] = useState<UserValue[]>([])

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: any) => {
      setOptions([])
      setFetching(true)

      fetchOptions(value, curMembers).then((newOptions: any) => {
        setOptions(newOptions)
        setFetching(false)
      })
    }

    return debounce(loadOptions, debounceTimeout)
  }, [debounceTimeout, fetchOptions, curMembers])

  useEffect(() => {
    return () => {
      // clear when unmount
      setOptions([])
    }
  }, [])

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size='small' /> : null}
      {...props}
    >
      {options.map((opt) => (
        <Select.Option key={opt.value} value={opt.value} title={opt.label}>
          <Avatar size='small' src={opt.photoURL}>
            {opt.photoURL ? '' : opt.label?.charAt(0)?.toUpperCase()}
          </Avatar>
          {` ${opt.label}`}
        </Select.Option>
      ))}
    </Select>
  )
}
