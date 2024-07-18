from django.forms.models import model_to_dict
from django.shortcuts import get_object_or_404


from .models import JobEntry, JobEntryDetails, JobentryDetailsRecord


def Building_item_list(jobentry):
    items = [
        "Architect", "Engineer", "Boundary Survey", "Trusses design", "Energy Calculations",
        "Land Clearing", "Plot Plan", "Apply Permits", "Order Windows", "Permit Fees",
        "Porta potty", "Utility Hook-Ups", "Pad stake", "Dirt",
        "Porta potty", "Dumpster", "House stake", "Dig footers", "Form Board survey",
        "Underground Plumbing", "Underground Electrical", "Soil Treatment", "Foundation",
        "Block", "Trusses", "Lumber", "Framing Labor", "Windows & Sliders",
        "Exterior Doors", "Dry-IN", "Roofing", "Electrical Rough-In",
        "HVAC Rough-In", "Plumbing Rough-In", "Stucco", "Exterior Paint", "Soffits",
        "Shingles", "Drywall", "Septic", "Interior Paint", "Electrical Trim",
        "HVAC Trim", "Plumbing Trim", "Paint Exterior", "Paint Interior", "Insulation",
        "Flooring Materials", "Flooring Labor", "Cabinets", "Countertops",
        "Interior Doors and Baseboard", "Interior Trim Labor", "Finish Electrical Light Fixtures",
        "Appliances", "Impact Fees", "Shower Glass", "Sidewalk, Parking, Driveway",
        "Landscaping", "Final Survey", "Final Survey Review", "Finance Charges",
        "Final Inspections and CO"
    ]
    for item in items:
        JobEntryDetails.objects.create(items=item, job=jobentry)
    JobentryDetailsRecord.objects.create(job=jobentry)

def record_updation(job_id):
    
    total_cost = 0
    total_completed_items = 0
    total_uncompleted_items = 0 
    total_completed_items_paid = 0
    total_completed_items_unpaid = 0
    job_record = get_object_or_404(JobentryDetailsRecord, job_id=job_id)

    completed_items_paid = JobEntryDetails.objects.filter(job_id=job_id, status = 1, paid=1)
    for paid in completed_items_paid:
        total_completed_items_paid = total_completed_items_paid + paid.cost

    completed_items_unpaid = JobEntryDetails.objects.filter(job_id=job_id, status = 1, paid=0)
    for unpaid in completed_items_unpaid:
        total_completed_items_unpaid = total_completed_items_unpaid + unpaid.cost

    costs = JobEntryDetails.objects.filter(job_id=job_id)
    for cost in costs:
        total_cost = total_cost + cost.cost
    
    uncompleted_items =  JobEntryDetails.objects.filter(job_id=job_id, status=0)
    for uncompleted_item in uncompleted_items:
        total_uncompleted_items = total_uncompleted_items + uncompleted_item.cost

    completed_items = JobEntryDetails.objects.filter(job_id=job_id, status=1)
    for completed_item in completed_items:
        total_completed_items =  completed_item.cost + total_completed_items

    job_entry = JobEntry.objects.get(id=job_id)
    payment_owed = job_entry.contract_price - job_record.contract_amount_paid

    job_record.__dict__.update(completed_items_paid=total_completed_items_paid,
    completed_items_unpaid=total_completed_items_unpaid, total_cost=total_cost,
    completed_items=total_completed_items, uncompleted_items=total_uncompleted_items,
    payment_owed=payment_owed)
         
    job_record.save()
    return model_to_dict(job_record)


    
