# 1. Project Overview
This project is a habit-tracking system designed for users who want to keep track of both positive habits (things they want to do more often) and negative habits (things they want to reduce). The goal was to keep the workflow simple: users can create habits, log events quickly, see their streaks, and admins can import/export app data. The entire system uses clean abstractions around habits, periods, repositories, and a facade builder that ties everything together.


### Key features:
- Login/signup flow using cookie-based authentication  
- Create, list, log, and delete habits  
- Supports daily/weekly/monthly/yearly streak logic  
- Admin-only JSON import/export of the full system  
- Clean separation between domain logic, persistence, and UI actions  


### Important constraints:
- All data is stored in memory and it resets when the server restarts.  
- Period math uses UTC and assumes week boundaries starting Sunday.  
- Import/export expects valid roles and habit types.  




# 2. Build & Run Instructions
1. Ensure Node.js v20+ is installed  
2. Run `npm install` to install dependencies  
3. Run `npm run build` to build the application  
4. Run `npm run preview` to run the application  




# 3. Required OOP Features


## Requirements Implementation (14/14):


### OOP Features Table


| OOP Feature | File Name | Line Numbers | Reasoning / Context |
|------------|-----------|--------------|---------------------|
| 1st instance of Inheritance | CustomHabit.ts | Line 3 + constructor 6-16 | CustomHabit extends Habit so that it can reuse(inherit) the habit logic and add userId along with custom fields. So that new user have unique Id. |
| 2nd instance of Inheritance (User Role Hierarchy) | User.ts | User (lines 11-28), AdminUser (lines 29-37), StandardUser (lines 38-46) | Introduces a proper inheritance chain. AdminUser and StandardUser both extend the abstract User class and override getRole(). This demonstrates inheritance role-specific behavior, and polymorphism while keeping user modeling clean and extensible. |
| 1st interface/implementation | Period.ts | Interface: lines 1-12, Daily implementation: 39-61 | The interface Period defines time by keeping track of the start,end and previous period. Then Daily class implements all the required methods. |
| 2nd interface/implementation | UserRepository.ts and IUserRepository.ts | IUserRepository:1-9, UserRepository:2,21-44 | The UserRepository provides actual logic for methods from IUserRepository, thus allowing CustomHabitBuilder to remain decoupled from concrete class while callers use the same interface and following DIP, enabling polymorphism as well. |
| 3rd interface/implementation | HabitRepository.ts and IHabitRepository.ts | HabitRepository.ts: line 5-76 | It implements the interface for creating, listing and logging habits. Thus keeping all the habits functionality of habits together. |
| 1st use of Polymorphism | Habit.ts | Line 55-67 | The Habit class calls .getPeriodStart() and .getPeriodEnd() without knowing the period type(daily/weekly/Monthly/yearly). Still the correct method and implementations are chosen at the runtime(dynamic dispatch). |
| 2nd Use of Polymorphism | Habit.ts | Lines 87-95 | Even during the streak calculation habit class calls period.getPrevious PeriodStart() through the same reference (interface) not knowing which concrete class it’s referring to, which is chosen at the run time. Thus saving the hassle of dealing with multiple object types and logic. |
| Enum | Habit.ts, Period.ts | Habit.ts line 3-9, Period.ts line 14-29 | Defines the allowable habit types (positive, negative). Thus improving consistency and ensuring valid types for habit following OCP. Also, preventing accidental misspellings for period types as well thus improving logic and readability as well. |
| One struct (or language equivalent) | Habit.ts, User.ts | Habit: line 11-14, User: line 9-13 | This language equivalent for struct, it’s a simple data container {multiplicity, period}, which ensures frequency remains in one constant form throughout the program. Also for User it’s a simple data container {id, username, role} for user object. |
| Data Structure | HabitRepository.ts, UserRepository.ts | HabitRepo Line 9, mutations 31-74; UserRepo Line 7, mutations 30-44 | User’s habits are stored in the form of an arrays in memory, operations user list traversals to search and operate over array. Users are also stored in the same array-based repository pattern. |
| Console/GUI I/O | Web UI (`src/routes/*`) | — | We implemented GUI (web-based) forms and HTTP response for I/O. (forms/pages handle input and output.) |




# 4. Design Patterns


| Pattern | Category | File | Lines | Rationale |
|--------|----------|------|-------|-----------|
| 1st Design Pattern (Singleton) | Creational | UserRepository.ts, CustomHabitBuilder.ts | 13-18, 19-27 | Singleton repository for users, enforcing a single instance in memory to access and work with. Also, getInstance ensures that only a single builder is referred to and coordinated across different files. Ensures less error and doesn’t required object specific. |
| 2nd Design Pattern (Factory) | Creational | Period.ts | 22-37 | ThePeriodFactory.create(type) creates correct subtype object based on string input given as type.(daily,weekly,monthly,yearly) This encapsulates object creation and decouples callers from concrete classes; the builder uses it when creating habits. |
| 3rd Design Pattern (Facade) | Structural | CustomHabitBuilder.ts | 45-145 | Gives a simple unified interface for complex API routes for operations like creating, logging, and listing. while hiding complex logic and giving one interface for routes and UI, making code more maintainable. |




# SOLID Principles:


### Single Responsibility Principle (SRP)
- Allowing each major component in the system to have a clearly defined role.  
- The Period classes focuses only on calculating the stamp time for habits (daily,weekly, monthly, yearly) (src/lib/server/HabitBuilder/Period.ts:39-141).  
- The Habit Repository is responsible only for storing, deleting and listing habits (src/lib/server/CustomHabitBuilder/HabitRepository.ts: 22-74)  
- The CustomHabitBuilder acats as a facade pattern which ties everything together, creating, listing, logging, importing and exporting (src/lib/server/CustomHabitBuilder/CustomHabitBuilder.ts:45-78, 80-145).  


### Open/Closed Principle (OCP)
- The system is open to extension without any requirements to change existing code.  
- PeriodFactory.create can be updated to allow new period types without modifying Habit logic. (Period.ts : 22-37)


### Liskov Substitution Principle (LSP)
- All concrete Period types follow the Period interface and can be substituted freely.  
- Habit relies only on the interface and calls its methods without concern for which subclass it receives. (Habit.ts:55-67, 87-95)


### Interface Segregation Principle (ISP)
- Interfaces are deliberately small and focused.  
- IHabitRepository contains only the methods required for habit functionality. (src/lib/server/HabitBuilder/IHabitRepository.ts:3-9)


### Dependency Inversion Principle (DIP)
- CustomHabitBuilder depends on abstractions instead of concrete classes.  
- It depends on IHabitRepository rather than HabitRepository (src/lib/server/CustomHabitBuilder/CustomHabitBuilder.ts:12,14-18)






# 5. Design Decisions (Summary)


### Habit logic stays inside Habit
This includes name, type, frequency, events, period event counts, and streak rules (Habit.ts:21-124).


### HabitFrequency acts as a small value object
It only carries multiplicity and the chosen period (Habit.ts:16-20).


### The Period abstraction controls all date boundaries
Daily/Weekly/Monthly/Yearly implement their own math (Period.ts:1-12, 44-146).


### Creation is centralized
PeriodFactory returns the correct period object (Period.ts:27-42).  
CustomHabitBuilder works as a facade for everything habit-related (CustomHabitBuilder.ts:8-146).


### Dependency Inversion
The builder depends on IUserRepository and IHabitRepository<CustomHabit> instead of concrete classes (CustomHabitBuilder.ts:11-14).  
Concrete repositories implement these interfaces cleanly.


### Singletons for app-wide state
The repos and builder use singletons so all routes share the same in-memory data. Initialization happens in hooks.server.ts.


### User and Habit association stays lightweight
CustomHabit only stores a userId, which avoids circular dependencies and keeps serialization simple.


### Server actions map directly to builder methods
Pages call createHabit, listHabits, logEvent, and deleteHabit directly through SvelteKit server actions.


### Admin-only import/export
The /data route handles JSON import/export entirely through the facade.
