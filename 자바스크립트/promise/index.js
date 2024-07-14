// 1. Promise.all
//     - resolve된 모든 결과를 가지고있는 return Promise{<fulfilled>: Array<any>[N]}
//     - reject되면 바로 return Promise {<rejected>: string}
//     - 예시 : "최소 N초 기다리기" 불가능 reject되면 바로 끝나기 때문. -> 네트워크 요청 중간에 끊기 가능
// 2. Promise.allSettled
//     - 뭐가되었든 간에 return Promise{<fulfilled>: Array<{status: 'fulfilled' | 'rejected', data?: any, reason?: any}>[N]}
//     - 예시 : "최소 N초 기다리기" 기능
//     - Promise.all 이랑 다른점은, 에러처리가 조금 다름.
// 3. Promise.race
//     - 그냥 제일 빠른걸로.
//     - 제일 빠른게 이행이면 : return Promise{<fulfilled>: any}
//     - 제일 빠른게 리젝이면 : return Promise{<rejected>: any}
//     - 예시 : 네트워크 요청 중간에 끊기 가능
// 4. Promise.any
//     - 성공한것 중에 제일 빠른걸로
//     - 예시 : 다운로드 링크가 빠르게 소멸되는? 곳에서 사용가능할듯.
//     - 하나의 프로미스라도 성공하면 : return Promise
//     - 모든 프로미스가 리젝되면 : return AggregationError
