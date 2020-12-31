import React from 'react'
import qs from 'query-string'
import differenceInYears from 'date-fns/differenceInYears'
import differenceInDays from 'date-fns/differenceInDays'

const parseDate = (dateString: string) => {
  return new Date(dateString)
}

const getJapaneseEra = (date: Date): {name: string, year: number} => {
  const year = date.getFullYear()
  // 明治以降の和暦を取得する
  if (year > 2018) {
    // 2019年以降は令和
    return {
      name: "令和",
      year: year - 2018
    };
  } else if (year > 1988) {
    return {
      name: "平成",
      year: year - 1988
    };
  } else if (year > 1925) {
    // 1926年以降は昭和
    return {
      name: "昭和",
      year: year - 1925
    }
  } else if (year > 1911) {
    // 1912年以降は大正
    return {
      name: "大正",
      year: year - 1911
    }
  } else if (year > 1867) {
    // 1868年以降は明治
    return {
      name: "明治",
      year: year - 1867
    }
  }
 
}

const Top: React.FC = () => {
  const [date, setDate] = React.useState<Date | null>(null)
  React.useEffect(() => {
    const query = qs.parse(location.search)
    console.log(query)
    if (query.birth &&
      typeof query?.birth === 'string' &&
      parseDate(query?.birth)) {
      const date = parseDate(query?.birth)
      setDate(date)
    }
  }, [])

  

  if (!date) {
    return <main>
      <h1>Please enter your birthday. ?birth=2000-01-01</h1>
    </main>
  }

  const now = new Date()
  const age = differenceInYears(now, date)
  const ageDay = differenceInDays(now, date)
  const japanese = getJapaneseEra(date)

  const japaneseNow = getJapaneseEra(now)
  const nowMonthDate = `${now.getMonth()+1}月${now.getDate()}日`
  return <main>
    <div>
      <h1>Your profile</h1>
      <h3>Your age: {age}</h3>
      <h3>Your age day: {ageDay}</h3>
      <h3>{date.toString()}</h3>
      <h3>{date.getFullYear()}</h3>
      <h3>{`${japanese.name} ${japanese.year}年`}</h3>
    </div>
    <div>
      <h1>Now</h1>
      <h3>{now.toString()}</h3>
      <h3>{`${now.getFullYear()}年${nowMonthDate}`}</h3>
      <h3>{`${japaneseNow.name}${japaneseNow.year}年${nowMonthDate}`}</h3>
    </div>
  </main>
}
export default  Top
