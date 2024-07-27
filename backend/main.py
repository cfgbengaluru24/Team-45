
from fastapi import FastAPI,UploadFile
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()
from pydantic import BaseModel
class user(BaseModel):
    username: str
    password: str

## Add the following code to the donor file:
class infra_item(BaseModel):
    Description: str
    Type: str
    Amount: int
# @app.post("/scholarship/")
# async def read_item():
#     return {
#             "message": "Saved Successfully",
#     }

@app.get("/infra/")
async def read_infra():
    return [
        infra_item(Description="Bench", Type="infra", Amount=42.0),
        infra_item(Description="Plumbus", Type="infra", Amount=32.0),
    ]
# { "Description": "Bench", "Type": "infra", "Amount":42.0 }
@app.post("/payment/")
async def pay():
    return {
        "message": "Payment Successful",
        "ID": "90"
    }
## Add the following code to the school file:
#{ "Name","Location" }
@app.post("/school/apply/")
async def apply(file: UploadFile):
    contents = await file.read()
    return {
        "message": "Application under review",
    }
@app.get("/school/")
async def read_school():
    return {
        "Name": "School of Science",
        "Location": "Kathmandu",
        "Verified": "True",
    }

## Add the following code to the GW file:
@app.get("/gw/details/")
async def details():
    return {
        "Name": "School of Science",
        "Location": "Road 21,Kathmandu",
        # "Documents": get from the database
    }
# { "uuid", "verify": "True" }
@app.post("/gw/verify/")
async def gwverify():
    return {
        "message": "Verified",
    }
## Add the following code to the NGO file
class ngo_item(BaseModel):
    name: str
    location: str
    # documents: str
    verified: bool = False
@app.get("/ngo/details/")
async def ngohome():
    return [
        ngo_item(name="NGO1", location="Kathmandu",),
        ngo_item(name="NGO2", location="Bhaktapur",)
    ]
# { "uuid", "verify": "True" }
@app.post("/ngo/verify/")
async def ngoverify():
    return {
        "message": "Verified",
    }
if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)