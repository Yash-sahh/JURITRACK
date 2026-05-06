from pydantic import BaseModel

class ActionPlan(BaseModel):
    case_name: str
    action: str
    department: str
    deadline: str
    risk: str