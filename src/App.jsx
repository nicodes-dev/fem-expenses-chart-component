import { useState, useEffect } from 'react'

export default function App() {
  const [expenses, setExpenses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const date = new Date()

  useEffect(() => {
    setIsLoading(true)
    fetch('/data.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        const list = data.map(expense => ({
          ...expense,
          height: Math.floor(expense.amount * 2.88),
        }))
        setExpenses(list)
        // setTimeout(() => {
        //   setIsLoading(false)
        // }, 2000)
        setError(null)
      })
      .catch(() => {
        setIsLoading(false)
        setError('Failed to fetch data. Something went wrong')
      })
  }, [])

  if (isLoading) {
    return (
      <main className="col-span-full place-self-center">
        <svg
          className="w-[60px] h-[40px] md:w-[72px] md:h-[48px] animate-spin mx-auto"
          viewBox="0 0 72 48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none" fillRule="evenodd">
            <circle fill="#382314" cx="48" cy="24" r="24" />
            <circle stroke="#FFF" strokeWidth="2" cx="24" cy="24" r="23" />
          </g>
        </svg>
        <h1 className="animate-pulse text-lg md:text-2xl mt-4 md:mt-8 font-semibold">
          Loading... Please Wait
        </h1>
      </main>
    )
  }

  if (error) {
    return (
      <div className="col-span-full place-self-center text-center">
        <h1 className="text-lg md:text-2xl mt-4 md:mt-8 text-primary-800 font-bold">
          {error}
        </h1>
      </div>
    )
  }

  const content = expenses && (
    <>
      <main className="relative px-4 flex flex-col gap-y-4 md:gap-y-6 col-span-12 md:col-start-4 md:col-end-10 sm:px-12  md:px-0">
        <header
          className="bg-primary-500 p-5 md:px-8 md:pt-[27px]  md:pb-[23px] 
        flex items-center justify-between
        text-white rounded-[10px] md:rounded-[20px]"
        >
          <div>
            <h1 className="text-[15px] leading-5 md:text-lg md:leading-[23px] mb-[4px] md:mb-2">
              My balance
            </h1>
            <h2 className="text-2xl md:text-[32px] md:leading-[42px] font-bold leading-[31px] mb-[2px]">
              $921.48
            </h2>
          </div>
          <svg
            className="w-[60px] h-[40px] md:w-[72px] md:h-[48px] mr-1 md:mr-[7px]"
            viewBox="0 0 72 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="none" fillRule="evenodd">
              <circle fill="#382314" cx="48" cy="24" r="24" />
              <circle stroke="#FFF" strokeWidth="2" cx="24" cy="24" r="23" />
            </g>
          </svg>
        </header>
        <div className="bg-neutral-100 px-5 py-6 md:px-10 md:py-8 rounded-[10px] md:rounded-[20px]">
          <div className="border-b-2 border-neutral-300 ">
            <h3 className="text-2xl md:text-[32px] md:leading-[42px]  font-bold leading-[31px] text-primary-800">
              Spending - Last 7 days
            </h3>
            <div className="grid grid-cols-7 gap-x-3 pt-[52px] md:pt[66px] md:gap-x-[18px]  pb-6 md:pb-8">
              {expenses.map((expense, index) => (
                <div
                  key={index}
                  className="relative flex flex-col gap-y-[11px] md:gap-y-[8px] justify-end text-center h-[178px]"
                >
                  <span
                    data-value={`$${expense.amount}`}
                    className={`bar relative w-full rounded-[3px] animate-grow ${
                      date.getUTCDay() === index
                        ? 'bg-accent-cyan hover:bg-[#76b5bcaa]'
                        : 'bg-primary-500 hover:bg-[#ec755daa]'
                    }`}
                    style={{
                      height: `${expense.height}px`,
                    }}
                  ></span>
                  <span className="text-xs md:text-[15px] md:leading-5 text-primary-100 justify-self-center">
                    {expense.day}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="pt-6 md:pt-8 grid md:mb-2 grid-cols-2 grid-rows-[repeat(3,min-content)]">
            <h4 className="text-[15px] leading-5 md:text-[18px] md:leading-[23px] mb-[4px] md:mb-[1px] text-primary-100 col-start-1 col-end-2 row-span-1">
              Total this month
            </h4>
            <h5 className="text-[30px] leading-[39px] text-primary-800 font-bold col-start-1 col-end-2 row-start-2 row-end-4 md:text-5xl md:leading-[62px]">
              $478.33
            </h5>
            <p className="text-[15px] leading-5 md:text-[18px] md:leading-[23px]  text-primary-800 font-bold col-start-2 row-start-2 text-right">
              +2.4%
            </p>
            <p className="text-[15px] leading-5 md:text-[18px] md:leading-[23px] text-primary-100 col-start-2 row-start-3 text-right">
              from last month
            </p>
          </div>
        </div>
      </main>
      <footer className="absolute hidden min-screen:block bottom-0 right-0 left-0 my-6 text-primary-500 text-center text-sm md:text-lg mx-auto col-span-full px-4">
        Challenge by{' '}
        <a
          href="https://www.frontendmentor.io?ref=challenge"
          className="text-primary-800 font-bold"
        >
          Frontend Mentor
        </a>
        . Coded by{' '}
        <a
          href="https://www.frontendmentor.io/profile/nicodes-dev"
          className="text-primary-800 font-bold"
        >
          nicodes-dev
        </a>
        .
      </footer>
    </>
  )
  return content
}
