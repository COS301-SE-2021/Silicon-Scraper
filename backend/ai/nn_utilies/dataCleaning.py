

#
#This function cleans the given data, by merging it with the model and getting rid of null rows
#
def clean_data(data, modelsDir):

    # Loading file with models
    models = pd.read_csv(modelsDir)
    models['model'] = models['model'].str.upper()

    # Renaming product model for consistency
    data['model'] = data['model'].str.upper()
    data['brand'] = data['brand'].str.upper()
    data['type'] = data['type'].str.upper()
    data['availability'] = data['availability'].str.upper()

    for dt in data.itertuples():
        for model in models.itertuples():
            if dt.model.find(str(model.model)) != -1:
                data.at[dt.Index, 'model'] = model.Index
                continue


#
#This function cleans the given data by merging its brand and getting rid of the empty rows
#
def setBrand(data):
    brands = set(data["brand"].str.upper())
    brands = brands
    brands = pd.DataFrame(brands)
    brands = brands.rename(columns={0: "brand"})
    brands

    for brand in brands.itertuples():
        data.loc[data["brand"].str.upper() == brand.brand, "brand"] = brand.Index

    return data

def mergeTypes(gpu_data,cpu_data):
    data = gpu_data.append(cpu_data, ignore_index = True)
    data['type'] = [1 if x == 'gpu' else 0 for x in data['type']]
    return data
