<h1> code_room </h1>
<br />

## 팀원 소개

<table>
  <tbody>
    <tr>
      <th align="center"><b>팀장: 서주환</b></th>
      <th align="center"><b>팀원: 김영범</b></th>
      <th align="center"><b>팀원: 김준영</b></th>
      <th align="center"><b>팀원: 박세영</b></th>
      <th align="center"><b>팀원: 박원빈</b></th>
      <th align="center"><b>팀원: 손서영</b></th>
    </tr>
    <tr>
      <td align="center"><img src="https://avatars.githubusercontent.com/u/104831702?v=4" width="100px;" alt="서주환"/></td>
      <td align="center"><img src="https://avatars.githubusercontent.com/u/96457953?v=4" width="100px;" alt="김영범"/></td>
      <td align="center"><img src="https://avatars.githubusercontent.com/u/167187204?v=4" width="100px;" alt="김준영"/></td>
      <td align="center"><img src="https://avatars.githubusercontent.com/u/131146693?v=4" width="100px;" alt="박세영"/></td>
      <td align="center"><img src="https://avatars.githubusercontent.com/u/119783002?v=4" width="100px;" alt="박원빈"/></td>
      <td align="center"><img src="https://avatars.githubusercontent.com/u/139070143?v=4" width="100px;" alt="손서영"/></td>
     <tr/>
     <td align="center"><a href="https://github.com/JoohwanSeo">@Jony</a></td>
      <td align="center"><a href="https://github.com/kybaq">@Yeong-Beom Kim</a></td>
      <td align="center"><a href="https://github.com/Eunyoung-Jo">@Eunyoung-Jo</a></td>
      <td align="center"><a href="https://github.com/Eunyoung-Jo">@Eunyoung-Jo</a></td>
      <td align="center"><a href="https://github.com/Eunyoung-Jo">@Eunyoung-Jo</a></td>
      <td align="center"><a href="https://github.com/sonsy723">@sonsy723</a></td>
    </tr>
  </tbody>
</table>
<br /><br />

## 주요 기능

- 회원가입, 로그인, 로그아웃
- 글 작성, 이미지 삽입, 카테고리 선택
- 내가 쓴 글 수정 / 삭제
- 댓글 작성
- 계정 비밀번호, 닉네임 변경
- 내가 쓴 글, 좋아요한 글 목록 보기
  <br /><br />

## 폴더 구조

- `public` : 에셋들을 넣어둔 폴더입니다.

- `src/app` : 라우팅과 관련한 루트 폴더입니다.

  - `/api` : 라우트 핸들러와 관련된 코드가 들어있는 폴더입니다.

    - `/auth` : 로그인과 관련된 라우트 핸들러 로직이 들어있는 폴더입니다.

  - `/(home)` : 실제 경로에서는 무시되는 라우터입니다.
    메인 페이지를 보여주며, 가독성을 위해 분리하였습니다.

    - `/sign-up` : 회원가입을 할 수 있는 페이지입니다.

    - `/login` : 로그인을 할 수 있는 페이지입니다.

    - `/user/[id]` : 경로 이름에 따라 변하는 라우터입니다.
      유저의 디테일 페이지를 보여줍니다.

      - `/edit` : 해당 id를 가진 유저의 정보를 수정할 수 있는 페이지입니다.

    - `/post/[id]` : 해당 id를 가진 피드를 볼 수 있는 페이지입니다.

      - `/edit` : 해당 id를 가진 피드를 수정할 수 있는 페이지입니다.

- `src/components`

  - `/common` : 여러 페이지에서 쓰일 수 있는 컴포넌트들을 모아놓은 폴더입니다.

  - `/HomePage` : 메인 페이지와 관련한 컴포넌트들을 모아놓은 폴더입니다.

  - `/LoginPage` : 로그인 페이지와 관련한 컴포넌트들을 모아놓은 폴더입니다.

  - `/MyPage` : 마이 페이지와 관련한 컴포넌트들을 모아놓은 폴더입니다.

  - `/PostingPage` : 피드 작성 페이지와 관련한 컴포넌트들을 모아놓은 폴더입니다.

  - `/PostPage` : 피드 디테일 페이지와 관련한 컴포넌트들을 모아놓은 폴더입니다.

  - `/SignUpPage` : 회원가입 페이지와 관련한 컴포넌트들을 모아놓은 폴더입니다.

  - `/Providers` : 프로바이더와 관련한 컴포넌트들을 모아놓은 폴더입니다.

  - `/ui` : shadcn 라이브러리와 관련한 컴포넌트들을 모아놓은 폴더입니다.

- `src/context` : `Context API`와 관련한 로직을 모아놓은 폴더입니다.

- `src/hooks` : `custom hook`과 관련한 로직을 모아놓은 폴더입니다.

- `src/store` : `zustand` 라이브러리와 관련해 전역 상태를 모아놓은 폴더입니다.

- `src/supabase` : `supabase` BaaS와 관련한 로직을 모아놓은 폴더입니다.

- `src/utils` : 여러 페이지에서 공통적으로 사용될 수 있는 유틸 함수들을 모아놓은 폴더입니다.
  <br /><br />

## 필수 구현 사항

✔ Typescript, Next.js 적용<br />
✔ redux 외의 클라이언트 전역상태관리 <br />
✔ 라이브러리 적용 (recoil, zustand, zotai 중 선택 권장)
supabase<br />
✔ 인증/인가 적용 (supabase authentication)<br />
✔ api 요청은 반드시 Route Handle<br />
✔ 성능 최적화 Lighthouse<br />
<br />

## Stacks
