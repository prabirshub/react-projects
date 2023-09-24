import { useState, useCallback, useEffect, useRef } from 'react'

const App = () => {
  const [length, setLength] = useState(8)
  const [isNumber, setIsNumber] = useState(false)
  const [isChar, setIsChar] = useState(false)
  const [pwd, setPwd] = useState('')

  // ref hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if (isNumber) str += '0123456789'
    if (isChar) str += '~!@#$%^&*_+=`'

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPwd(pass)
  }, [length, isNumber, isChar, setPwd])

  useEffect(() => {
    passwordGenerator()
  }, [length, isNumber, isChar, passwordGenerator])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 101)

    window.navigator.clipboard.writeText(pwd)
  }, [pwd])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-slate-900'>
        <h1 className='text-4xl text-center my-3 text-slate-100'>
          Password Generator
        </h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type='text'
            value={pwd}
            className='read-only:placeholder-slate-700 outline-none w-full py-2 px-3'
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          >
            Copy
          </button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-2'>
            <input
              type='range'
              min={6}
              max={25}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {
                setLength(e.target.value)
              }}
            />
            <label className='text-slate-100'>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={isNumber}
              id='numberInput'
              onChange={() => {
                setIsNumber((prev) => !prev)
              }}
            />
            <label className='text-slate-100' htmlFor='numberInput'>
              Number
            </label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={isChar}
              id='charInput'
              onChange={() => {
                setIsChar((prev) => !prev)
              }}
            />
            <label className='text-slate-100' htmlFor='charInput'>
              Charactors
            </label>
          </div>
        </div>
      </div>
    </>
  )
}
export default App
