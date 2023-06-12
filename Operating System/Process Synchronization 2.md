# Process Synchronization 2
## 프로그램적(소프트웨어적) 해결법의 충족 조건

- **Mutual Exclusion (상호 배제)**  
  프로세스 p가 critical section 부분을 수행 중이면 다른 모든 프로세스들은 그들의 critical section에 들어가면 안된다.
- **Progress**  
  아무도 critical section에 있지않은 상태에서 critical section에 들어가고자 하는 프로세스가 있으면 critical section에 들어가게 해주어야 한다.
- **Bounded waiting (유한 대기)**  
  프로세스가 critical section에 들어가려고 요청한 후부터 그 요청이 허용될 때까지 다른 프로세스들이 critical section에 들어가는 횟수에 한계가 있어야한다.

_알고리즘 가정_

- 모든 프로세스의 수행속도는 0이다.
- 프로세스들 간의 상대적인 수행속도는 가정하지 않는다.

### Algorithm1

- Synchronization variable:  
  int turn=0 => Process can enter its critical section if turn ==i
- Process P0 code:

  ```c
  do{
    while(turn !=0);//process 0 turn
    //critical section
    turn=1; // now other process turn
    //remainder section

  }while(1);
  ```

- 각 프로세스의 turn 값과 일치하는 번호를 가진 프로세스만 critical section에 접근할 수 있다.
- Mutual Exclusion 조건을 만족.(한번에 하나의 프로세스만 접근 가능)
- **하지만 Progress 조건을 만족시키지 못한다**. turn을 교대로 주기 때문에 프로세스가 한번 critical section에 들어갔다 나와야지만 turn값을 변경해줄 수 있다.

### Algorithm2

- Synchronization variables:  
  boolean flag[2];  
  initially flag=false => 첨엔 아무도 CS에 없다.  
  Pi 는 if(flag[i]==true) 일때 CS에 들어간다.
- Process Pi code:

```c
do{
  flag[i]=true; //나 Pi인데 들어간다~
  while(flag[j]);// Pj들어 갔냐? 들어갔음 기다린다
  //critical section
  flag[i]=false; // Pi 나간다~
  //remainder section
}while(1);
```

- 각 프로세스는 자신의 flag boolean을 가진다. flag가 true경우 프로세스가 critical section에 들어간다.  
   자신의 flag를 true로 만든 다음 상대방의 flag를 체크한다.
  두개의 프로세스가 동시에 flag를 true로 설정하면 상대방의 flag 값이 true 이므로 두 프로세스 모두 critical section에 못들어가고 계속 대기하게 된다.
- **즉 Mutual Exclusion 조건을 만족하지만 Progress 조건을 만족시키지 못한다.**

### Algorithm3(Peterson's Algorithm)

- Combined synchronization variables of algorithms 1,2
- Process Pi code:
  ```c
  do{
    flag[i]=true;// 나 i인데 들어가도 됌?
    turn=j;// 일단 상대방 턴 먼저 주기
    while(flag[j]&&turn==j);//상대방이 깃발을 들고 있거나 상대방 턴이면 기다리기
    //critical section
    flag[i]=false; // 내 깃발 내리기
    //remainder section
  }while(1);
  ```
- 자신의 flag를 true로 변경하고, turn을 상대 프로세스의 값으로 변경한다. while문에서 상대방이 깃발을 들고있는지 체크. 만약 조건을 만족시키지 못하면 i는 critical section에 들어가게된다.
- 둘다 CS에 들어가고 싶을때만 턴을 따져 순서를 정함.
- 이 알고리즘은 세 critical section problem을 모두 만족한다.
- Busy Waiting(Spin lock)문제 발생 : 이미 다른 프로세스가 CS에 들어갔을 때도 계속 CPU와 memory를 쓰면서 while문을 돌면서 wait 한다.

## Synchronization Hardware Solution

- 하드웨어적으로 하나의 instruction만 주어지면 critical section문제는 해결 가능 => Test&modify를 atomic 하게 수행하면 instruction 하나가 실행되는 도중에 CPU를 빼앗기지 않음.
- Ex) Test_and_set instruction, boolean lock=false;
  ```c
  do{
    while(Test_and_Set(lock));//lock이 0이면 들어가도됌, 1이면 ㄴㄴ
    //critical section
    lock=false;
    //remainder section
  }
  ```
  lock이 0인지(lock이 안걸린 상태) test_and_set에서 확인을 하고 1로 변경(내가 lock을 걸고 critical section으로 들어간다는 의미)

## Semaphores

일종의 추상자료형 : 기능의 구현 부분을 나타내지 않고 순수한 기능이 무엇인지 나열한 것. 사용 설명서와 같다.

### Busy-wait implementation

semaphore를 다음과 같이 정의

```c
P(S): while(S<=0)do no-op; //busy-wait
      S--; //S가 양수면 하나 빼고 사용.
V(S): S++;
```

- Semaphore S : integer variable로 자원의 갯수
- P, V 두가지 atomic 연산에 의해서만 자원 접근 가능
- P 연산은 semaphore 값(공유 자원)을 획득하는 과정
- V 연산은 사용 후 반납하는 과정
- lock을 잠그고 푸는 경우는 semaphore의 자원이 1개일 때

### block & wakeup implementation

semaphore를 다음과 같이 정의

```c
typedef struct{
  int value; //semaphore
  struct process *L; //process wait queue
}semaphore;
```

```c
P(S): S.value--; //prepare to enter
      if(S.value<0) //nagative->can't enter
      {
        //add this process to S.L;
        block();
      }
V(S): S.value++; //return data
      if(S.value<=0){
        //remove a process P from S.L;
        wakeup(P);
}
```

- semaphore를 기다리는 프로세스들을 L queue에 넣는다. block과 wakeup을 다음과 같이 가정
- block : 커널은 block을 호출한 프로세스를 suspend 시킴. 프로세스의 PCB를 semaphore에 대한 wait queue에 넣음.
- wakeup (P) : block된 프로세스 P를 wakeup 시킴. 이 프로세스의 PCB를 ready queue로 옮김.
- P연산은 자원을 획득하는 연산.  
  자원의 여분이 있다면 바로 획득하지만, 없다면 block상태가 된다.
- V 연산은 자원을 반납하는 연산.  
  반납할 때 이 자원을 기다리면서 잠들어있는 프로세스가 있다면 wakeup.  
  v연산을 종료하고 s.value++를 해줬는데도 s.value가 0 이하라면 대기중인 프로세스가 있다는 것을 의미

### busy waiting V.S. block & wakeup

보통은 block & wakeup이 더 효율적이다.  
cpu를 계속 쓰면서 기다릴 필요 없이 cpu 반납하고 block 상태로 있는 것이 효율.

- Block/wakeup overhead v.s. Critical section 길이
  - Critical section의 길이가 긴 경우는 Block/wakeup이 적당하고
  - Critical section길이가 짧은 경우에는 Block/wakeup의 오버헤드가 busy-waiting 오버헤드보다 더 커질수 있다

### Types of Semaphores

- Counting semaphore
  - 도메인이 0 이상인 임의의 정수값
  - 주로 resouce counting에 사용
- Binary semaphore(=mutex)
  - 0또는 1 값만 가질 수 있는 semaphore(자원의 개수가 1개)
  - 주로 lock/unlock에 사용

## Problems of Semaphore(Deadlock and Starvation)

- **Deadlock**  
   둘 이상의 프로세스가 서로 상대방에 의해 충족될 수 있는 event를 무한히 기다리는 현상.  
   해결 방안 : 프로세스가 semaphore를 얻는 순서를 동일하게 만들어주면(프로세스들 모두 데이터 S 얻고 데이터 Q 순서대로 얻게하기)
- **Starvation**  
  **indefinite blocking**. 프로세스가 suspend된 이후에 semaphore 큐에서 빠져나갈 수 없는 현상