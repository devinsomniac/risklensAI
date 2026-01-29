from pathlib import Path
import joblib

Model_path_cal = Path("models")/"risklens_uci_gb_calibrated_sigmoid.joblib"
Model_path_base = Path("models")/"risklens_uci_gb_pipeline.joblib"
Bg_path = Path("models")/"shap_background.joblib"

#Container class to store the cached model
class _store:
    calibrated_model = None
    base_model = None
    bg_data = None

#Create a single instance to cache the model
store = _store()

#Model loading
def load_models():
    if not Model_path_cal.exists():
        raise FileNotFoundError(f"Model not found: {Model_path_cal.resolve()}")
    if not Model_path_base.exists():
        raise FileNotFoundError(f"Model not found: {Model_path_base.resolve()}")
    if not Bg_path.exists():
        raise FileNotFoundError(f"Background not found: {Bg_path.resolve()}")

    store.calibrated_model = joblib.load(Model_path_cal)
    store.base_model = joblib.load(Model_path_base)
    store.bg_data = joblib.load(Bg_path)

    return store.calibrated_model, store.base_model, store.bg_data



def get_model():
    if store.calibrated_model is None:
        load_models()
    return store.calibrated_model

def get_base_model():
    if store.base_model is None:
        load_models()
    return store.base_model

def get_shap_background():
    if store.bg_data is None:
        load_models()
    return store.bg_data