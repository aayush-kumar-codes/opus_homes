from django.forms.models import model_to_dict
from django.shortcuts import get_object_or_404


from .models import JobEntry, JobEntryDetails, JobentryDetailsRecord


def Building_item_list(jobentry):
    items = [
        "Architect", "Engineer", "Boundary Survey", "Trusses design", "Energy Calculations",
        "Land Clearing", "Plot Plan", "Apply Permits", "Order Windows", "Permit Fees",
        "Porta potty", "Utility Hook-Ups", "Premilinaries", "Pad stake", "Dirt",
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
    total_items = 64
    total_paid = 0
    job_price = 0
    job_record = get_object_or_404(JobentryDetailsRecord, job_id=job_id)
    total_completed_items = JobEntryDetails.objects.filter(job_id=job_id, status = 1).count()
    uncompleted_items = total_items - total_completed_items
    total_completed_items_paid = JobEntryDetails.objects.filter(job_id=job_id, status = 1, paid=1).count()
    total_completed_items_unpaid = JobEntryDetails.objects.filter(job_id=job_id, status = 1, paid=0).count()
    paids = JobEntryDetails.objects.filter(job_id=job_id, paid=1)
    for paid in paids:
        total_paid = total_paid + paid.cost
    completed_items = JobEntryDetails.objects.filter(job_id=job_id, status=1)
    for completed_item in completed_items:
        job_price =  completed_item.cost + job_price
    payment_owed = job_price - total_paid
    job_record.__dict__.update(
    completed_items=total_completed_items,
    uncompleted_items=uncompleted_items, completed_items_paid=total_completed_items_paid,
    completed_items_unpaid=total_completed_items_unpaid, Total_paid=total_paid,
    job_price=job_price, payment_owed=payment_owed)
         
    job_record.save()
    return model_to_dict(job_record)


    
