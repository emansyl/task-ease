import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, DimensionValue } from "react-native";

interface SkeletonItemProps {
  width: DimensionValue;
  height: number;
  borderRadius?: number;
  marginBottom?: number;
}

interface LoadingSkeletonProps {
  itemCount?: number;
  itemHeight?: number;
}

function SkeletonItem({
  width,
  height,
  borderRadius = 4,
  marginBottom = 0,
}: SkeletonItemProps) {
  return (
    <View
      style={[
        styles.skeletonItem,
        { width, height, borderRadius, marginBottom },
      ]}
    />
  );
}

export default function LoadingSkeleton({
  itemCount = 5,
  itemHeight = 120,
}: LoadingSkeletonProps) {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shimmerAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    );

    shimmerAnimation.start();

    return () => shimmerAnimation.stop();
  }, [shimmerAnim]);

  const opacity = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  const renderTaskSkeleton = () => (
    <Animated.View style={[styles.taskItem, { opacity }]}>
      {/* Checkbox skeleton */}
      <SkeletonItem width={24} height={24} borderRadius={12} marginBottom={0} />

      {/* Content area */}
      <View style={styles.contentArea}>
        {/* Title skeleton */}
        <SkeletonItem width="80%" height={20} marginBottom={8} />

        {/* Description skeleton */}
        <SkeletonItem width="60%" height={16} marginBottom={12} />

        {/* Meta information */}
        <View style={styles.metaArea}>
          <SkeletonItem width={100} height={14} marginBottom={0} />
          <View style={styles.badgesArea}>
            <SkeletonItem
              width={60}
              height={20}
              borderRadius={10}
              marginBottom={0}
            />
            <SkeletonItem
              width={50}
              height={20}
              borderRadius={10}
              marginBottom={0}
            />
          </View>
        </View>
      </View>

      {/* Action buttons skeleton */}
      <View style={styles.actionsArea}>
        <SkeletonItem
          width={20}
          height={20}
          borderRadius={10}
          marginBottom={0}
        />
        <SkeletonItem
          width={20}
          height={20}
          borderRadius={10}
          marginBottom={0}
        />
      </View>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      {Array.from({ length: itemCount }).map((_, index) => (
        <View key={index}>{renderTaskSkeleton()}</View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contentArea: {
    flex: 1,
    marginLeft: 12,
  },
  metaArea: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  badgesArea: {
    flexDirection: "row",
    gap: 8,
  },
  actionsArea: {
    marginLeft: 8,
    gap: 8,
  },
  skeletonItem: {
    backgroundColor: "#e1e1e1",
  },
});
