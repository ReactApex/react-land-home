import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImages } from "../../store/campsiteImages";
import "./CampsiteImages.css";
import AddCampsiteImageModal from "../AddCampsiteImage";

const CampsiteImages = ({ campsiteId }) => {
  const dispatch = useDispatch();
  const images = Object.values(useSelector((state) => state?.images));
  const campsite = useSelector((state) => state.campsite[campsiteId]);
  const allImages = images?.filter(
    (image) => image?.campsiteId === +campsiteId
  );
  const [index, setIndex] = useState(0);
  const [showRight, setShowRight] = useState(true);
  const [showLeft, setShowLeft] = useState(false);

  useEffect(() => {
    if (index === allImages.length - 1) {
      setShowRight(false);
    } else {
      setShowRight(true);
    }

    if (index > 0) {
      setShowLeft(true);
    } else {
      setShowLeft(false);
    }
  }, [index]);

  const handleSwipeRight = () => {
    if (index < allImages.length - 1) {
      setIndex(index + 1);
    }
  };

  const handleSwipeLeft = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  useEffect(() => {
    dispatch(getImages(+campsiteId));
  }, [dispatch, campsiteId, campsite]);

  const handleImageUpload = async (e) => {};

  return (
    <>
      <h1>Campsite Gallery</h1>
      <div className="image-container">
        <div className="image">
          <img src={allImages[index]?.imageUrl} alt="campsite" />
        </div>
        <div className="image-buttons">
          {showLeft && <button onClick={handleSwipeLeft}>{"<"}</button>}
          {showRight && <button onClick={handleSwipeRight}>{">"}</button>}
        </div>
      </div>
      <AddCampsiteImageModal campsiteId={campsiteId} />
    </>
  );
};

export default CampsiteImages;
