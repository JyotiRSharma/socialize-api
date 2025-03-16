
### .env blueprint:

Remove the angular braces when you fill it up.

```
DATABASE_URL="mongodb+srv://<username>:<password>@cluster0.sj5fk.mongodb.net/<database_name>?retryWrites=true&w=majority"
JWT_SECRET="YOUR_ANY_SECRET_HERE"
```

**Note:** You need to probably add `0.0.0.0` IP in your Network Access atleast for the development.
**Warning:** adding `0.0.0.0` in production may cause security issues if you leak your Atlas credentials.