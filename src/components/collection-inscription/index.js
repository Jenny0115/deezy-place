/* eslint-disable react/forbid-prop-types */
import { useState } from "react";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";

import clsx from "clsx";
import Anchor from "@ui/anchor";
import ClientAvatar from "@ui/client-avatar";
import ProductBid from "@components/product-bid";
import { useWallet } from "@context/wallet-context";
import { shortenStr } from "@services/nosft";
import { InscriptionPreview } from "@components/inscription-preview";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const CountdownTimer = dynamic(() => import("@components/countdown-timer"), {
  ssr: false,
});

const OrdinalCard = ({ overlay, inscription }) => {
  console.count("OrdinalCard");
  const [onSale, setOnSale] = useState(null);
  const [type, setType] = useState(null);

  const id = inscription?.id;
  const num = inscription?.num;
  const { name, slug, icon } = inscription?.collection || {};
  const hasCollection = Boolean(inscription?.collection);
  const price = {
    amount: inscription?.sats.toLocaleString("en-US"),
    currency: "Sats",
  };
  const date = inscription?.created;
  const path = `/inscription/${id}`;

  return (
    <SkeletonTheme baseColor="#13131d" highlightColor="#242435">
      <Anchor className="logo-dark" path={path}>
        <div className={clsx("product-style-one", !overlay && "no-overlay")}>
          <div className="card-thumbnail">
            <InscriptionPreview utxo={inscription} />
          </div>
          <div className="inscription-details-area">
            {inscription && (
              <div className="inscription-number">
                {num ? `#${num}` : "\u00A0"}
              </div>
            )}
            {!inscription && <Skeleton width={50} />}
          </div>
          <div className="product-share-wrapper">
            <div className="profile-share">
              {hasCollection && (
                <ClientAvatar
                  key={name}
                  slug={slug}
                  image={{ src: icon }}
                  name={id}
                />
              )}

              {!hasCollection && <Skeleton circle height={40} width={40} />}

              <div className="more-author-text">
                {id && (
                  <Anchor className="logo-dark" path={path}>
                    {shortenStr(id)}
                  </Anchor>
                )}
                {!id && <Skeleton width={140} />}
              </div>
            </div>
          </div>

          {inscription && (
            <ProductBid
              price={price}
              utxo={inscription}
              confirmed
              date={date}
              type={type}
              onSale={onSale}
            />
          )}
          {!inscription && (
            <div className="mt--10">
              <Skeleton width={200} count={1} />
            </div>
          )}
        </div>
      </Anchor>
    </SkeletonTheme>
  );
};

OrdinalCard.propTypes = {
  overlay: PropTypes.bool,
  inscription: PropTypes.object,
};

OrdinalCard.defaultProps = {
  overlay: false,
};

export default OrdinalCard;
