<h1> >_ code_room </h1>

## 기획

**`기술 스택 SNS`**

프로젝트에 사용된 기술 스택의 사용 이유를 공유하는 피드 형식의 커뮤니티

**`피그마 링크`** : [>\_code_room 피그마 초안 링크](https://www.figma.com/design/hfrfB6sIIUFnjWluPlaF5n/team-project?node-id=0-1)

## 팀원 소개

<table>
  <tbody>
    <tr>
      <th className='text-center justify-center'><b>팀장: 서주환</b></th>
      <th className='text-center justify-center'><b>팀원: 김영범</b></th>
      <th className='text-center justify-center'><b>팀원: 김준영</b></th>
      <th className='text-center justify-center'><b>팀원: 박세영</b></th>
      <th className='text-center justify-center'><b>팀원: 박원빈</b></th>
      <th className='text-center justify-center'><b>팀원: 손서영</b></th>
    </tr>
    <tr>
      <td align="center"><img src="https://avatars.githubusercontent.com/u/104831702?v=4" width="100px;" alt="서주환"/></td>
      <td align="center"><img src="https://avatars.githubusercontent.com/u/96457953?v=4" width="100px;" alt="김영범"/></td>
      <td align="center"><img src="https://avatars.githubusercontent.com/u/166312623?v=4" width="100px;" alt="김준영"/></td>
      <td align="center"><img src="https://avatars.githubusercontent.com/u/131146693?v=4" width="100px;" alt="박세영"/></td>
      <td align="center"><img src="https://avatars.githubusercontent.com/u/119783002?v=4" width="100px;" alt="박원빈"/></td>
      <td align="center"><img src="https://avatars.githubusercontent.com/u/139070143?v=4" width="100px;" alt="손서영"/></td>
     </tr>
      <td align="center"><a href="https://github.com/JoohwanSeo">@Jony</a></td>
      <td align="center"><a href="https://github.com/kybaq">@Yeong-Beom Kim</a></td>
      <td align="center"><a href="https://github.com/JvnKim">@Jun</a></td>
      <td align="center"><a href="https://github.com/SeYoungYee">@SeYoungYee</a></td>
      <td align="center"><a href="https://github.com/harry21-kr">@Park Won Bin</a></td>
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

  ## 기술 스택

<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white" /> <img src="https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=white" /> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black"/> <img src ="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" />

<img src="https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white" /> <img src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white" /> <img src="https://img.shields.io/badge/visual studio code-007ACC?style=for-the-badge&logo=visual studio code&logoColor=white" /> <img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white" /> <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=Vercel&logoColor=white"/> <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" /> <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" /> <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white" /> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white" />

<img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" /> <img src="https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=slack&logoColor=white" /> <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white" />

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
<br /><br />

## 선택 구현 사항

✔ API 요청 시 Tanstack Query<br />
✔ React Query의 useInfiniteQuery 적용<br />
✔ React Query의 enabled와 select 옵션 사용<br />
✔ useQuery의 queryKey 다양하게 사용<br />
✔ UI Library 활용<br />
✔ Memoization 기법 사용<br />
✔ Next.js의 middleware 기능을 이용하여 인증 상태를 관리
<br /><br />

## ERD

![Schema_Visualizer](https://github.com/user-attachments/assets/4c379ba3-3516-4a83-a547-c6acc02d9cf9)
<br /><br />

## Trouble Shooting

<details>
  <summary>1. 비밀번호 변경 오류</summary>
  <b>오류</b> : 비밀번호 변경을 요청해도 supabase 상에 비밀번호 데이터가 바뀌지 않는 오류 발견<br />
  <b>해결</b> : <a href="https://supabase.com/docs/guides/auth/passwords?queryGroups=language&language=js#resetting-a-password">password-based</a>를 참고하여 비밀번호를 재설정할 때엔 이메일 인증이 완료된 사용자만 접근 가능한 것을 확인했습니다. auth-provider에서 confirm email 설정으로 회원가입 시 이메일 인증을 필수로 받게 하여 추후 비밀번호를 재설정 할 수 있게 해결하였습니다.
</details>
<details>
<summary>2. 좋아요 구현</summary>
  <b>오류</b> : 좋아요 기능 구현 시 `user_id` 로 테이블 접근할 시 내용 변경이 되지 않는 현상<br />
  <b>해결</b> : user 테이블에 있는 `user_id` 값을 기반으로, 해당 유저의 `liked_post` 항목에 수정을 하려고 시도하면 값 수정이 되지 않는 문제가 있었습니다. `email` 을 통해 접근하는 방법으로 변경하니 값 수정이 가능했습니다.
</details>

## Unsolved Trouble Shooting

<details>
  <summary>1. 좋아요 수 실시간 반영</summary>
  <b>오류</b> : 좋아요 버튼을 누르더라도 실시간으로 반영이 되지 않는 문제<br />
  <b>원인</b> : supabase 에서 `post` 테이블의 값이 변하는 상황을 감지하지 못해서 갱신이 안되는 현상으로 파악했습니다.
</details>
<details>
  <summary>2. 좋아요 취소 기능</summary>
  <b>오류</b> : 이미 좋아요를 누른 상태여도 계속해서 중복 좋아요가 되는 문제<br />
  <b>원인</b> : supabase 에서 `user` 테이블의 `liked_post` 항목에서 post_id 중복을 막는 기능이 필요한 것으로 파악했습니다.
</details>
<details>
  <summary>3. 유저가 좋아요 누른 게시글의 버튼 UI 수정</summary>
  <b>오류</b> : 이미 좋아요를 누른 게시글이지만 새로 고침 시 좋아요를 누르지 않은 상태의 UI 가 나타남<br />
  <b>원인</b> : 좋아요 누른 게시글의 목록을 가져오지 않고 있어서 이를 불러온 다음, 상태 관리를 통해 UI 조건부 렌더링을 적용해야할 것으로 파악했습니다
</details>
