/**
 * @api {post} /user/register Register a new user
 * @apiName RegisterUser
 * @apiGroup User
 * @apiDescription Register a new user
 * @apiVersion 1.0.0
 * @apiParam {String} userName     Mandatory user name.
 * @apiParam {String} password     Mandatory password.
 * @apiParam {String} email     Optional email.
 * @apiParamExample {json} Request-Example:
 *     {
 *       "userName": "username",
 *       "password": "password",
 *       "email"   : "email@abc.com"
 *     }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_id":     : "23hjf8923ncnkd2323",
 *       "userName" : "username",
 *       "password" : "password",
 *       "email"    : "email@abc.com",
 *       "createdOn": "created date"
 *     }
 * @apiError RequiredFiledMissing The <code>userName</code> 
 * or <code>password</code> was not present in request.
 * @apiErrorExample {json} RequiredFiledMissing:
 *     HTTP/1.1 400 Bad request
 *     {
 *       "message": "username/password missing"
 *     }
 * @apiError (Error 5xx) UsernameExixts The <code>userName</code> 
 * is already present.
 * @apiErrorExample {json} UsernameExixts:
 *     HTTP/1.1 500 Server Error
 *     {
 *       "message": "Username already exists"
 *     }
 */


/**
 * @api {post} /user/authenticate Login an already registered user
 * @apiName LoginUser
 * @apiGroup User
 * @apiDescription Login an already registered user
 * @apiVersion 1.0.0
 * @apiParam {String} userName     Mandatory user name.
 * @apiParam {String} password     Mandatory password.
 * @apiParamExample {json} Request-Example:
 *     {
 *       "userName": "username",
 *       "password": "password"
 *     }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message"  : "Success!",
 *       "token"    : "auth_token",
 *       "userId"   : "userId",
 *       "UserName" : "Username"
 *     }
 * @apiError RequiredFiledMissing The <code>userName</code> 
 * or <code>password</code> was not present in request.
 * @apiErrorExample {json} RequiredFiledMissing:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "username/password missing"
 *     }
 * @apiError UserNotFound The <code>userName</code> is not valid user.
 * @apiErrorExample {json} UserNotFound:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "User not found"
 *     }
 * @apiError PasswordWrong The <code>password</code> is wrong.
 * @apiErrorExample {json} PasswordWrong:
 *     HTTP/1.1 403 No Permission
 *     {
 *       "message": "Password is wrong"
 *     }
 * @apiError (Error 5xx) ServerError Some server error occured
 * @apiErrorExample {json} ServerError:
 *     HTTP/1.1 500 Server Error
 *     {
 *       "message": "Error occured"
 *     }
 */


/**
 * @api {post} /user/validate Check if a token is valid or not
 * @apiName CheckToken
 * @apiGroup User
 * @apiDescription Check if a token is valid or not
 * @apiVersion 1.0.0
 * @apiParam {String} token     Token to check.
 * @apiParamExample {json} Request-Example:
 *     {
 *       "token": "token"
 *     }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message"  : "Token alive!!",
 *       "token"    : "auth_token",
 *       "userId"   : "userId",
 *       "UserName" : "Username"
 *     }
 * @apiError RequiredFiledMissing The <code>token</code> 
 *  was not present in request.
 * @apiErrorExample {json} RequiredFiledMissing:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Token missing"
 *     }
 * @apiError ToeknInvalid The <code>token</code> is not valid/expired.
 * @apiErrorExample {json} ToeknInvalid:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "Invalid token"
 *     }
 * @apiError (Error 5xx) ServerError Some server error occured
 * @apiErrorExample {json} ServerError:
 *     HTTP/1.1 500 Server Error
 *     {
 *       "message": "Error occured"
 *     }
 */


/**
 * @api {get} /user/logout Logout a logged-in user
 * @apiName LogoutUser
 * @apiGroup User
 * @apiDescription Logout a logged-in user
 * @apiVersion 1.0.0
 * @apiParam {String} token     Token to check.
 * @apiParamExample {json} Request-Example:
 *     {
 *       "token": "token"
 *     }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message"  : "Success"
 *     }
 * @apiError RequiredFiledMissing The <code>token</code> 
 *  was not present in request.
 * @apiErrorExample {json} RequiredFiledMissing:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Token missing"
 *     }
 * @apiError ToeknInvalid The <code>token</code> is not valid/expired.
 * @apiErrorExample {json} ToeknInvalid:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "Invalid token"
 *     }
 * @apiError (Error 5xx) ServerError Some server error occured
 * @apiErrorExample {json} ServerError:
 *     HTTP/1.1 500 Server Error
 *     {
 *       "message": "Could not logout"
 *     }
 */

/**
 * @api {get} /todo/list Get the todos of a user loggedin
 * @apiName GetTodoList
 * @apiGroup Todo
 * @apiDescription Get the todos of a user loggedin
 * @apiVersion 1.0.0
 * @apiParam {String} token     Token of the user.
 * @apiParamExample {json} Request-Example:
 *     {
 *       "token": "token"
 *     }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *     	{
 *     		"_id"       : "todo_id",
 *     		"text"      : "todo text",
 *     		"completed" : "false/true",
 *     		"createdOn" : "creation date",
 *     		"file"      : {
 *                       "path"  : "url of the file",
 *                       "uuid"  : "id of the file",
 *                       "type"  : "Type of the file"
 *                       },
 *     		"expiary"   : "Todo expiary date",
 *     		"user"      : "The user id of the creator"
 *     	}
 *     ]
 * @apiError RequiredFiledMissing The <code>token</code> 
 *  was not present in request.
 * @apiErrorExample {json} RequiredFiledMissing:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Token missing"
 *     }
 * @apiError ToeknInvalid The <code>token</code> is not valid/expired.
 * @apiErrorExample {json} ToeknInvalid:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "Invalid token"
 *     }
 * @apiError (Error 5xx) ServerError Some server error occured
 * @apiErrorExample {json} ServerError:
 *     HTTP/1.1 500 Server Error
 *     {
 *       "message": "Could not logout"
 *     }
 */


/**
 * @api {get} /todo/single/:todoId Get a single todo of the user
 * @apiName GetSingleTodo
 * @apiGroup Todo
 * @apiDescription Get a single todo of the user
 * @apiVersion 1.0.0
 * @apiParam {String} todoId     id of the todo.
 * @apiParam {String} token     Token of the user.
 * @apiParamExample {json} Request-Example:
 *     {
 *       "token" : "token",
 *       "todoId": "todo_id"
 *     }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     	{
 *     		"_id"       : "todo_id",
 *     		"text"      : "todo text",
 *     		"completed" : "false/true",
 *     		"createdOn" : "creation date",
 *     		"file"      : {
 *                       "path"  : "url of the file",
 *                       "uuid"  : "id of the file",
 *                       "type"  : "Type of the file"
 *                       },
 *     		"expiary"   : "Todo expiary date",
 *     		"user"      : "The user id of the creator"
 *     	}
 * @apiError RequiredFiledMissing The <code>token</code> 
 *  was not present in request.
 * @apiErrorExample {json} RequiredFiledMissing:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Token missing"
 *     }
 * @apiError ToeknInvalid The <code>token</code> is not valid/expired.
 * @apiErrorExample {json} ToeknInvalid:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "Invalid token"
 *     }
 * @apiError TodoNotFound The <code>todoId</code> is not valid.
 * @apiErrorExample {json} TodoNotFound:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Not valid todo id"
 *     }
 * @apiError (Error 5xx) ServerError Some server error occured
 * @apiErrorExample {json} ServerError:
 *     HTTP/1.1 500 Server Error
 *     {
 *       "message": "Server Error"
 *     }
 */