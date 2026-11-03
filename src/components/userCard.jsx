export default function UserCard({
  user,
  isPreview = false,
  fallbackPhoto = "https://img.magnific.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-1230.jpg",
}) {
  // Get user's full name
  const name = [user.firstName, user.lastName].filter(Boolean).join(" ");

  // Check whether the photo URL begins with http:// or https://
  const isValidPhoto =
    user.photoUrl?.startsWith("https://") ||
    user.photoUrl?.startsWith("http://");

  // Use fallback photo for invalid URLs in preview mode
  const photo = isPreview && !isValidPhoto ? fallbackPhoto : user.photoUrl;

  // If an image fails to load, display the fallback photo
  const handleImageError = (event) => {
    const image = event.currentTarget;

    if (isPreview && image.src !== fallbackPhoto) {
      image.onerror = null;
      image.src = fallbackPhoto;
    }
  };

  // Display age and gender
  const age =
    user.age != null && user.age !== "" ? `${user.age} years old` : "";

  const details = [age, user.gender].filter(Boolean).join(" · ");

  return (
    <article className="card w-full max-w-96 overflow-hidden bg-base-100 shadow-sm">
      <figure className="aspect-square bg-base-200">
        <img
          src={photo}
          onError={isPreview ? handleImageError : undefined}
          alt={name ? `Profile photo of ${name}` : "Profile photo"}
          className="size-full object-cover"
        />
      </figure>

      <div className="card-body wrap-break-word">
        <h1 className="card-title">{name}</h1>

        <p>{details}</p>

        <p>{user.about}</p>

        <div className="card-actions mt-3 justify-end">
          <button
            type="button"
            disabled={isPreview}
            className="btn border-pink-700 bg-pink-700 text-white hover:border-pink-800 hover:bg-pink-800"
          >
            Ignore
          </button>

          <button
            type="button"
            disabled={isPreview}
            className="btn btn-primary"
          >
            Send Connection
          </button>
        </div>

        {isPreview && (
          <p className="text-xs text-base-content/70">
            Preview only · Connection actions are disabled.
          </p>
        )}
      </div>
    </article>
  );
}
