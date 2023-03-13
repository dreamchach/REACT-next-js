# NEXT-JS

## 설치

```bash
npx create-next-app@latest (--typescript)
```

## route

```javascript
// pages/index.js
// https://localhost:3000
export default function Home() {
  return "hi";
}
```

```javascript
// pages/about.js
// https://localhost:3000/about
export default function AboutAll() {
  return "about us";
}
```

## page 이동

```javascript
// components/NavBar.js
export default function NavBar() {
  return (
    <nav>
      <Link href="/">
        <div>Home</div>
      </Link>
      <Link href="/about">
        <div>About</div>
      </Link>
    </nav>
  );
}
```

```javascript
// pages/index.js
export default function Home() {
  const router = useRouter();
  console.log(router);

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div>Home</div>
    </div>
  );
}
```

## NextJS 스타일 조작

### .module.css

```css
// components/NavBar.module.css
// 반드시 파일의 속성을 .module.css 로 지정할 것
.nav {
  background-color: tomato;
}
.active {
  font-size: 30px;
}
```

```javascript
// components/NavBar.js
import styles from './NavBar.module.css'

...

<div className={styles.nav}>
<div className={router.pathname === '/' ? styles.active : ''}>
<div className={`${styles.nav} ${styles.active}`}>
<div className={[styles.nav, styles.active].join(' ')}>

...

```

### styles JSX

```javascript
// components/NavBar.js

...

<nav>Hello</nav>
<div>World</div>

...

<style jsx>
    {`
        nav {background-color: tomato;}
        a {text-decoration: none;}
    `}
</style>

...

```

## 전역 관리

### 전역 스타일 관리

```javascript
// components/NavBar.js

...

<nav>Hello</nav>
<div>World</div>

...

<style jsx global>
    {`
        nav {background-color: tomato;}
        a {text-decoration: none;}
    `}
</style>

...

```

### \_app.js

```javascript
// pages/_app.js
// index.js 확인 전 서버에서 _app.js를 확인
// 처음 NextJS 설치 시 따라오는 global.css는 접목불가
export default function App ({Component, pageProps}) {
    return (
        <Component {...pageProps} />
        <div>global</div>
    )
}
```

## 레이아웃 설정

```javascript
// components/Layout.js
export default function Layout({ children }) {
  return (
    <div>
      <NavBar />
      <div>{children}</div>
    </div>
  );
}
```

```javascript
// pages/_app.js

...

<Layout>
    <Component {...pageProps} />
</Layout>

...

```

## html head 설정

```javascript
// pages/index.js
import Head from 'next/head'

...

<div>
    <Head>
        <title> Home | Next Movies </title>
    </Head>
    <div>Hello</div>
</div>

...

```

탭의 이름이 `Home | Next Movies` 로 변환됨

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <title>Home | Next Movies</title>

    ...
  </head>

  ...
</html>
```

과 동일

## 이미지 삽입

1. `public`폴더에 이미지를 넣는다.
2. `<Image src='/vercel.svg' />`

## 데이터 패칭

```javascript
// pages/index.js

...

const [movies, setMovies] = useState([])

useEffect(()=>{
    const hello = async () => {
        const {results} = await (
            await fetch(url)
        ).json()

        console.log(data)
    }

    hello()
}, [])

...

```

## location path명(만) 변경

### next.config.js

```javascript
// next.config.js
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/contect",
        destination: "/form",
        permanent: false,
        // 'https://localhost:3000/contect'로 이동하면,
        // 'https://localhost:3000/form'으로 도착
        // destination의 value는 'https://naver.com'이라도 상관없음
      },
      {
        source: "/old-blog/:path",
        destination: "/new-blog/:path",
        permanent: false,
        // 'https://localhost:3000/old-blog/123456'으로 이동하면,
        // 'https://localhost:3000/new-blog/123456'으로 도착
      },
      {
        source: "/old-blog/:path*",
        destination: "/new-blog/:path*",
        permanent: false,
        // 'https://localhost:3000/old-blog/123456/abcd/7890/efg'으로 이동하면,
        // 'https://localhost:3000/new-blog/123456/abcd/7890/efg'으로 도착
      },
    ];
  },
};
```

### router.push()로 변경

```javascript
// pages/index.js
const onClick = (id) => {
  router.push(
    {
      pathname: `/movie/${id}`,
      query: {
        id,
        title,
      },
    },
    `/movies/${id}`
  );
};

// `https://localhost:3000/movies/${id}/?id=${id}/title=${title}`의 값인 parhname이 `https://localhost:3000/movies/${id}`로 변경
```

### Link as 로 변경

```javascript
// pages/index.js
<Link
  href={{
    pathname: `/movies/${movie.id}`,
    query: {
      id,
      title,
    },
  }}
  as={`/movies/${movie.id}`}></Link>
```

## api키 숨기기

```javascript
// next.config.js
const MYAPI = "1234...";
module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "api/movies",
        destination: `https://api.themoviedb.org/api=${MYAPI}`,
      },
    ];
  },
};
```

```javascript
// pages/index.js

...

await fetch('/api/movies')

...

```

## Loading(클라이언트 사이드 데이터 렌더링 vs 서버 사이드 렌더링)

### 서버 사이드 렌더링

```javascript
// pages/index.js

export async function getServerSideProps() {
  // 컴포넌트명 변경불가
  // 백엔드에서만 작동(server에서만 작동)
  const { results } = await (await fetch("https://localhost:3000/api/movies")).json();
  return {
    props: {
      results,
    },
  };
}
```

`results`값이 `pageProps`로 이동

```javascript
// pages/_app.js
export default function MyApp({Component, pageProps}) {
    ...
}
```

`pageProps`가 `{results}`로 이동

```javascript
// pages/index.js
export default function Home({results}) {
    ...
}
```

## /movies/:id 경로

```javascript
// pages/movies/all.js
// https://localhost:3000/movies/all
export default function All() {
  return "all";
}
```

```javascript
// pages/movies/[id].js
// [] 안에 변수를 삽입
// 즉, https://localhost:3000/movies/:id 와 동일
export default function Detail() {
  const router = useRouter();
  console.log(router);
  return "detail";
}
```

## Detail page로 이동

**아래의 방법들은 하위페이지로 데이터를 옮길 때, 상위페이지에서 이동할 때만 정보가 넘어옴**
주소창으로 바로 하위페이지로 이동하면 데이터가 넘어가지 않음.

### Link

```javascript
// pages/index.js
...
{results?.map((movie)=>{
    return (
        <Link href={`/movies/${movie.id}`} key={movie.id}>
            <div>
                <h4>{movie.original_title}</h4>
            </div>
        </Link>
    )
})}
```

### useRouter().push()

```javascript
// pages/index.js
export default function Home({results}) {
    const router = useRouter()
    const onClick = (id) => {
        router.push(`/movie/${id}`)
    }

    ...

    {results?.map((movie)=>{
        return (
            <div onClick={()=>{onClick(movie.id)}} key={movie.id}>
                <h4>{movie.original_title}</h4>
            </div>
        )
    })}
}
```

### pathname

```javascript
// pages/index.js
const onClick = (id) => {
  router.push({
    pathname: `/movie/${id}`,
    query: {
      id,
      title,
    },
  });
};

// `https://localhost:3000/movies/${id}/?id=${id}/title=${title}` 로 이동
```

## 주소창에서 하위페이지로 이동해도 정보가 넘어가는 방법

- `pages/movies/[id].js`를 `pages/movies.[...id].js`로 변경할 것

### 클라이언트 데이터 사이드 렌더링

```javascript
// pages/index.js
...
const onClick = (id, title) => {
    router.push(`/movies/${title}/${id}`)
}
...
```

```javascript
// pages/movies/[...id].js
...
const [title, id] = router.query.params || []
...
<h4>{title}</h4>
...

```

### 서버 사이드 렌더링

```javascript
// pages/movies/[...id].js

export default getServerSideProps({params: {params}}) {
    console.log(params)

    return {
        props: {params}
    }
}
```

```javascript
// pages/movies/[...id].js
export default function Detail({params}) {
    ...
    const [title, id] = params || []
}
```

## 404페이지 커스텀

```javascript
// pages/404.js
export default function NotFound() {
  return "what are you doing here?";
}
```
