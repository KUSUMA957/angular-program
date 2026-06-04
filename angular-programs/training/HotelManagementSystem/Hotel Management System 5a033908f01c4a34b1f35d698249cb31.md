# Hotel Management System

## Introduction

<aside>
📚 The Hotel Management System is a comprehensive software solution designed to streamline and automate various aspects of hotel operations, including reservation management, room allocation, user authentication, and more. The system provides a robust backend infrastructure with a set of well-defined APIs to facilitate easy integration with front-end applications or external services. The project employs a relational database model to efficiently store and retrieve data, ensuring data consistency and integrity.

</aside>

## Objective

<aside>
📌 **Hotel Management System aims to enhance project and task collaboration, improve productivity, and provide valuable insights into project progress and team performance. Its user-friendly interface and robust features make it a valuable tool for organizations seeking efficient task and project management.**

</aside>

## Database Schema

- ER Diagram
    
    [ER_Diagram_Hotel.mwb](ER_Diagram_Hotel.mwb)
    
    [ER_Diagram_Hotel.pdf](ER_Diagram_Hotel.pdf)
    
- Database Script File
    
    [create hotel.sql](create_hotel.sql)
    

## Design Guidelines

1. All Rest API requests and response formats must be in JSON.
2. 200, 201, 400, 404, 401, 500, 505 – use the appropriate HTTP status code in your response object.
3. Handle the Rest exceptions globally using the Rest exception handler for all endpoints.
4. Test your Rest Api using Junit and Mockito.
5. Participants should not alter database schema under any circumstances except wherever changes are mentioned explicitly.

## Rest API Design

All REST API requests and responses follow the JSON format. The project implies standard HTTP status codes (200, 201, 400, 404, 401, 500, 505) appropriately in response objects to convey the outcome of API requests.

## Status Codes

HTTP response codes are used to indicate general classes of success and error. 

| HTTP Status Quote | **Description** |
| --- | --- |
| 200 | Successfully processed request. |
| 201 | Created |
| 202 | Accepted |
| 400 |  Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

# Endpoints

[Endpoints](Endpoints%205b3f9872606e45d7b2801997dec5d663.csv)